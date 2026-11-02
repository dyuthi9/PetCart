import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const [added, setAdded] = useState(false);
    const [message, setMessage] = useState("");
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {
        try {
            setAdding(true);
            setMessage("");

            const result = await addToCart(product);

            if (!result.ok) {
                setMessage(result.message || "Unable to add product.");
                return;
            }

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

                <h6 className="product-name">{product.name}</h6>

                <p className="product-weight">{product.weight}</p>

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
                    {adding ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
                </button>

                {/* Fixed message area */}
                <div className="product-message-slot">
                    {message && (
                        <p className={added ? "success-message" : "login-message"}>
                            {message}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProductCard;