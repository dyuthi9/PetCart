
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

    const [showCheckout, setShowCheckout] = useState(false);
    const [ordering, setOrdering] = useState(false);
    const [error, setError] = useState("");

    const [address, setAddress] = useState({
        fullName: user?.name || "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setOrdering(true);
        setError("");

        try {
            const orderData = {
    address,
    paymentMethod,
};

const result = await placeOrder(orderData);

            if (result.ok) {
                alert("Order placed successfully! 🐾");
                setShowCheckout(false);
            } else {
                setError(result.message || "Unable to place order.");
            }

        } catch (err) {
            console.error("Place order error:", err);
            setError("Something went wrong. Please try again.");
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

                {loading && <p>Loading...</p>}

                {!loading && items.length === 0 && (
                    <p className="cart-message">
                        Your cart is empty.
                        <Link to="/"> Continue shopping</Link>
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
                                <h4 className="cart-item-name">
                                    {product.name}
                                </h4>

                                <span className="cart-item-price">
                                    ₹{Number(product.price).toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <div className="cart-item-actions">

                            <div className="cart-qty">
                                <button
                                    onClick={() =>
                                        updateQuantity(product._id, quantity - 1)
                                    }
                                >
                                    −
                                </button>

                                <span>{quantity}</span>

                                <button
                                    onClick={() =>
                                        updateQuantity(product._id, quantity + 1)
                                    }
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
                            <span>
                                ₹{cartTotal.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="cart-buttons">
                            <button
                                className="cart-clear"
                                onClick={clearCart}
                            >
                                Clear cart
                            </button>

                            <button
                                className="cart-order"
                                onClick={() => setShowCheckout(true)}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                )}

                {/* CHECKOUT FORM */}

                {showCheckout && items.length > 0 && (
                    <div className="checkout-container">

                        <h2>Checkout 🐾</h2>

                        <form onSubmit={handlePlaceOrder}>

                            <h3>Delivery Address</h3>

                            <div className="checkout-grid">

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={address.fullName}
                                    onChange={handleAddressChange}
                                    required
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={address.phone}
                                    onChange={handleAddressChange}
                                    pattern="[0-9]{10}"
                                    title="Enter a valid 10-digit phone number"
                                    required
                                />

                                <input
                                    type="text"
                                    name="street"
                                    placeholder="House No. / Street Address"
                                    value={address.street}
                                    onChange={handleAddressChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={address.city}
                                    onChange={handleAddressChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={address.state}
                                    onChange={handleAddressChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="PIN Code"
                                    value={address.pincode}
                                    onChange={handleAddressChange}
                                    pattern="[0-9]{6}"
                                    title="Enter a valid 6-digit PIN code"
                                    required
                                />

                            </div>

                            <h3>Payment Details</h3>

                            <div className="payment-options">

                                <label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />
                                    Cash on Delivery
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="UPI"
                                        checked={paymentMethod === "UPI"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />
                                    UPI
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="CARD"
                                        checked={paymentMethod === "CARD"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />
                                    Credit / Debit Card
                                </label>

                            </div>

                            <div className="checkout-total">
                                <h3>
                                    Total Amount: ₹
                                    {cartTotal.toLocaleString("en-IN")}
                                </h3>
                            </div>

                            {error && (
                                <p className="login-message">
                                    {error}
                                </p>
                            )}

                            <div className="cart-buttons">

                                <button
                                    type="button"
                                    className="cart-clear"
                                    onClick={() => setShowCheckout(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="cart-order"
                                    disabled={ordering}
                                >
                                    {ordering
                                        ? "Processing..."
                                        : "Confirm Order"}
                                </button>

                            </div>

                        </form>
                    </div>
                )}

            </div>
        </main>
    );
}

export default Cart;
