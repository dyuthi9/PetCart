
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
    const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
  <img
    src={product.image || "/default-product.png"}
    alt={product.name}
    className="product-image"
    onError={(e) => {
      e.currentTarget.src = "./src/assets/logo.png";
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
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        <button className="add-cart-btn" onClick={handleAddToCart}>
      <span>🛒</span> {added ? "Added ✓" : "Add to Cart"}
    </button>
      </div>
    </div>
  );
}

export default ProductCard;
