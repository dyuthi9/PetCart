import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./Categories.css";

import {
  FaBone,
  FaPaw,
  FaBowlFood,
  FaBriefcaseMedical,
  FaCouch,
} from "react-icons/fa6";

const API = "https://petcart-api-qxd2.onrender.com";

const categories = [
  {
    name: "Food",
    label: "Food & Treats",
    title: "Pet Food & Treats",
    icon: <FaBowlFood />,
    match: ["Dog Food", "Cat Food", "Food"]
  },
  {
    name: "Toys",
    label: "Toys",
    title: "Pet Toys",
    icon: <FaBone />,
    match: ["toys", "toy"],
  },
  {
    name: "Pets",
    label: "Pets",
    title: "Pets",
    icon: <FaPaw />,
    match: ["pets", "pet"],
  },
  {
    name: "Care Essentials",
    label: "Care Essentials",
    title: "Care Essentials",
    icon: <FaBriefcaseMedical />,
    match: ["careessentials", "care", "essentials"],
  },
  {
    name: "Furniture",
    label: "Furniture",
    title: "Pet Furniture",
    icon: <FaCouch />,
    match: ["furniture", "funiture"],
  },
];

// "Care Essentials" -> "careessentials", so spacing/case differences still match
const normalize = (text) =>
  String(text || "").toLowerCase().replace(/[^a-z]/g, "");

function Categories() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCategory = location.state?.category || "Toys";
  const current = categories.find((c) => c.name === selectedCategory);

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
        setError(err.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openCategory = (category) => {
    navigate("/categories", { state: { category } });
  };

  // Same logic as the old pages: filter by category, show first 10
 const filtered = current
    ? products
        .filter((p) =>
            current.match.some(
                (category) => normalize(category) === normalize(p.category)
            )
        )
        .slice(0, 10)
    : [];

  return (
    <>
      <section id="categories">
        <h1 className="text-center mb-4">Categories</h1>

        <div className="category-container">
          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              className={`category-item ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => openCategory(category.name)}
            >
              <div className="category-icon">{category.icon}</div>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="categories-page">
        <div className="category-page-content">
          {!current ? (
            <p className="text-center">Category not found.</p>
          ) : (
            <section className="home1">
              <h1 className="text-center mb-4">{current.title}</h1>

              {loading && (
                <p className="text-center">Loading {current.label}...</p>
              )}

              {error && <p className="text-center text-danger">{error}</p>}

              {!loading && !error && filtered.length === 0 && (
                <p className="text-center">
                  No products available in {current.label}. Please add products
                  to your database.
                </p>
              )}

              <div className="row g-4">
                {filtered.map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={product._id || product.id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}

export default Categories;