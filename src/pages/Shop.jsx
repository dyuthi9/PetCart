
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

const API = "https://petcart-api-qxd2.onrender.com";

function Shop() {
    const [searchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API}/products`);

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);

            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Unable to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="home1 shop-page">

            <h2 className="shop-title">Search Results</h2>

            <p className="shop-subtitle">
                Searching for: <strong>{searchTerm || "All Products"}</strong>
            </p>

            {loading ? (
                <p className="shop-message">Loading products...</p>
            ) : error ? (
                <p className="shop-message error">{error}</p>
            ) : filteredProducts.length === 0 ? (
                <p className="shop-message">
                    No products found.
                </p>
            ) : (
                <div className="row g-4">
                    {filteredProducts.map((product) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={product._id || product.id}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}

        </section>
    );
}

export default Shop;
