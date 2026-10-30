import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const API = "https://petcart-api-qxd2.onrender.com";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the cart from the server (on login / refresh)
  const loadCart = useCallback(async () => {
    if (!token) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      setItems((data.items || []).filter((i) => i.product));
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Shared helper: sends the request, then stores the items the server returns
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

  const addToCart = async (product, quantity = 1) => {
    if (!token) return { ok: false, needsLogin: true };
    return request("/cart/add", "POST", {
      productId: product._id,
      quantity,
    });
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    if (quantity > 100) return { ok: false, message: "Maximum quantity is 100" };
    return request(`/cart/${productId}`, "PATCH", { quantity });
  };

  const removeFromCart = (productId) => request(`/cart/${productId}`, "DELETE");

  const clearCart = () => request("/cart", "DELETE");

  // Creates an order from the server-side cart; the server empties the cart
  const placeOrder = async () => {
    const result = await request("/orders", "POST");
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