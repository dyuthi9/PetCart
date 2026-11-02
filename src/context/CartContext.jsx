import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const API = "https://petcart-api-qxd2.onrender.com";
const GUEST_KEY = "petcart_guest_cart";
const CartContext = createContext(null);

// ---------- guest cart helpers (localStorage) ----------
const readGuestCart = () => {
  try {
    const data = JSON.parse(localStorage.getItem(GUEST_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items) => {
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Could not save guest cart:", err);
  }
};

export function CartProvider({ children }) {
  const { token, logout } = useAuth();
  const [items, setItems] = useState(() => (token ? [] : readGuestCart()));
  const [loading, setLoading] = useState(false);

  // Guest only: update state and localStorage together
  const saveGuest = (next) => {
    setItems(next);
    writeGuestCart(next);
  };

  // Send guest items to the server cart after login
  const mergeGuestCart = async () => {
    const guestItems = readGuestCart();
    if (guestItems.length === 0) return;

    // Clear first so a double run (React StrictMode) can't add them twice
    localStorage.removeItem(GUEST_KEY);

    const failed = [];
    for (const item of guestItems) {
      try {
        const res = await fetch(`${API}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.product._id,
            quantity: item.quantity,
          }),
        });
        if (!res.ok) failed.push(item);
      } catch {
        failed.push(item);
      }
    }

    // Keep anything that failed so it is retried next time
    if (failed.length) writeGuestCart(failed);
  };

  // Load the cart: server if logged in, localStorage if guest
  const loadCart = useCallback(async () => {
    if (!token) {
      setItems(readGuestCart());
      return;
    }
    setLoading(true);
    try {
      await mergeGuestCart();

      const res = await fetch(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.items)) {
        setItems(data.items.filter((i) => i.product));
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Shared helper for logged-in requests
  const request = async (path, method, body) => {
    try {
      const res = await fetch(`${API}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (res.status === 401) {
        logout();
        return { ok: false, message: "Session expired. Please log in again." };
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { ok: false, message: data.message || "Cart update failed" };
      }

      setItems((data.items || []).filter((i) => i.product));
      return { ok: true, message: data.message };
    } catch (err) {
      console.error("Cart error:", err);
      return { ok: false, message: "Unable to connect to the server." };
    }
  };

  // ---------- cart actions (guest or logged in) ----------
  const addToCart = async (product, quantity = 1) => {
    if (token) {
      return request("/cart/add", "POST", {
        productId: product._id,
        quantity,
      });
    }

    // Guest
    const current = readGuestCart();
    const existing = current.find((i) => i.product._id === product._id);
    const next = existing
      ? current.map((i) =>
          i.product._id === product._id
            ? { ...i, quantity: Math.min(i.quantity + quantity, 100) }
            : i
        )
      : [...current, { product, quantity }];

    saveGuest(next);
    return { ok: true };
  };

  const removeFromCart = async (productId) => {
    if (token) return request(`/cart/${productId}`, "DELETE");

    saveGuest(readGuestCart().filter((i) => i.product._id !== productId));
    return { ok: true };
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    if (quantity > 100) return { ok: false, message: "Maximum quantity is 100" };

    if (token) return request(`/cart/${productId}`, "PATCH", { quantity });

    saveGuest(
      readGuestCart().map((i) =>
        i.product._id === productId ? { ...i, quantity } : i
      )
    );
    return { ok: true };
  };

  const clearCart = async () => {
    if (token) return request("/cart", "DELETE");

    saveGuest([]);
    return { ok: true };
  };

  // Checkout still requires login
  const placeOrder = async (orderData) => {
    if (!token) {
      return { ok: false, needsLogin: true, message: "Please log in to place your order." };
    }

    const result = await request("/orders", "POST", orderData);
    if (result.ok) setItems([]);
    return result;
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);