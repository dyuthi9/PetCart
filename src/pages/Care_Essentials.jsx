
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../components/Categories.css";

function Care_Essentials({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://petcart-api-qxd2.onrender.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const careProducts = data
          .filter(
            (product) =>
              product.category?.toLowerCase() === "care essentials"
          )
          .slice(0, 10);

        setProducts(careProducts);
      } catch (err) {
        setError(err.message || "Unable to load care products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="home1">
      <h1 className="text-center mb-4">Care Essentials</h1>

      {loading && (
        <p className="text-center">Loading care essentials...</p>
      )}

      {error && (
        <p className="text-center text-danger">{error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center">
          No care products available. Please add products to your database.
        </p>
      )}

      <div className="row g-4">
        {products.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={product._id || product.id}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Care_Essentials;
