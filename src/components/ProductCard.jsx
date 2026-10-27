import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
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

        <button
          className="add-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          <span>🛒</span> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
