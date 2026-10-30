import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../pages/Auth.css";

function Cart() {
  const { user } = useAuth();
  const {
    items,
    loading,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
  } = useCart();

  const [ordering, setOrdering] = useState(false);

  const handlePlaceOrder = async () => {
  setOrdering(true);
  try {
    const result = await placeOrder();
    alert(result.ok ? "Order placed! 🐾" : result.message);
  } catch (err) {
    console.error("Place order error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setOrdering(false);
  }
};

  if (!user) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <h2 className="cart-title">Your Cart 🛒</h2>
          <p className="cart-message">
            Please <Link to="/login">log in</Link> to see your cart.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="home1 cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Your Cart 🛒</h2>

        {loading && <p className="cart-message">Loading...</p>}

        {!loading && items.length === 0 && (
          <p className="cart-message">
            Your cart is empty. <Link to="/">Continue shopping</Link>
          </p>
        )}

        {items.map(({ product, quantity }) => (
          <div className="cart-item" key={product._id}>
            <div className="cart-item-info">
              {product.image && (
                <img
                  className="cart-item-image"
                  src={product.image}
                  alt={product.name}
                />
              )}
              <div>
                <h4 className="cart-item-name">{product.name}</h4>
                <span className="cart-item-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="cart-item-actions">
              <div className="cart-qty">
                <button
                  onClick={() => updateQuantity(product._id, quantity - 1)}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => updateQuantity(product._id, quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="cart-remove"
                onClick={() => removeFromCart(product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="cart-buttons">
              <button className="cart-clear" onClick={clearCart}>
                Clear cart
              </button>
              <button
                className="cart-order"
                onClick={handlePlaceOrder}
                disabled={ordering}
              >
                {ordering ? "Placing order..." : "Place order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;