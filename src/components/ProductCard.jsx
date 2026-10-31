
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {

    const { addToCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [added, setAdded] = useState(false);
    const [message, setMessage] = useState("");
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {

        // Check authentication using AuthContext
        if (!token || !user) {
            setMessage("Please login first to add products!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

            return;
        }

        try {
            setAdding(true);
            setMessage("");

            // Add product to cart
            await addToCart(product);

            setAdded(true);
            setMessage("Product added successfully!");

            setTimeout(() => {
                setAdded(false);
                setMessage("");
            }, 1200);

        } catch (error) {
            console.error("Add to cart error:", error);
            setMessage("Unable to add product. Please try again.");
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="product-card">

            <div className="product-image-container">
                <img
                    src={product.image || "/default-product.png"}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.currentTarget.src = "/default-product.png";
                    }}
                />
            </div>

            <div className="product-details">

                <h6 className="product-name">
                    {product.name}
                </h6>

                <p className="product-weight">
                    {product.weight}
                </p>

                <div className="product-rating">
                    <span className="stars">★★★★☆</span>

                    <span className="rating-count">
                        {product.rating} ({product.reviews})
                    </span>
                </div>

                <div className="product-price">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                </div>

                <button
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                    disabled={adding}
                >
                    <span>🛒</span>

                    {adding
                        ? "Adding..."
                        : added
                        ? "Added ✓"
                        : "Add to Cart"}
                </button>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
}

export default ProductCard;
