
import "./Home.css";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

import {
  FaBone,
  FaPaw,
  FaBowlFood,
  FaBriefcaseMedical,
  FaCouch,
} from "react-icons/fa6";
import { useCart } from "../context/CartContext";

function Home({ onAddToCart }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  // ...your existing useState / useEffect code...

  const handleAddToCart = async (product) => {
    const result = await addToCart(product);
    if (result.needsLogin) {
      navigate("/login");
      return;
    }
    if (!result.ok) alert(result.message);
    else alert(`${product.name} added to cart 🐾`);
  };
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
        setProducts(data);
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
    navigate("/categories", {
      state: { category },
    });
  };

  const categories = [
    { name: "Food", label: "Food & Treats", icon: <FaBowlFood /> },
    { name: "Toys", label: "Toys", icon: <FaBone /> },
    { name: "Pets", label: "Pets", icon: <FaPaw /> },
    {
      name: "Care Essentials",
      label: "Care Essentials",
      icon: <FaBriefcaseMedical />,
    },
    { name: "Furniture", label: "Furniture", icon: <FaCouch /> },
  ];

  return (
    <>
      <section className="home1" id="home">
        <div className="divhome">
          <p>HAPPY PETS ~ HEALTHY LIVES</p>

          <h1>
            Everything Your <br />
            Pet Needs
          </h1>

          <button
            className="shop-btn"
            onClick={() => {
              document.getElementById("shop")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Shop Now →
          </button>
        </div>
      </section>
<section  id="categories">
        <h1 className="text-center mb-4">Categories</h1>

        <div className="category-container">
          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              className="category-item"
              onClick={() => openCategory(category.name)}
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="home1" id="shop">
        <h1 className="text-center mb-4">Shop Now</h1>

        {loading && (
          <p className="text-center">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-danger">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center">No products available.</p>
        )}

        <div className="product-slider">
          {!loading &&
            !error &&
            products.slice(0, 8).map((product) => (
              <div
                className="product-slide"
                key={product._id || product.id}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
        </div>
      </section>

      

       {/* ---------- ABOUT ---------- */}
      <section className="home1 about-section" id="about">
        
        <h1 className="text-center mb-4">About PetCart</h1>

        <div className="about-content">
          <p className="about-intro">
            PetCart is a one-stop shop for everything your furry, feathered and
            scaly family members need. We believe every pet deserves good food,
            safe toys and a comfy place to rest.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <span className="about-icon">🐾</span>
              <h3>Quality Products</h3>
              <p>Carefully picked food, toys and care essentials for every pet.</p>
            </div>

            <div className="about-card">
              <span className="about-icon">🚚</span>
              <h3>Fast Delivery</h3>
              <p>Your order is packed with care and delivered to your door.</p>
            </div>

            <div className="about-card">
              <span className="about-icon">💛</span>
              <h3>Made with Love</h3>
              <p>We are pet parents too, so we only sell what we would use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="home1 contact-section" id="contact">
        <h1 className="text-center mb-4">Contact Us</h1>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p>Questions about an order or a product? We are happy to help.</p>
            <p>📍 Vijayawada, Andhra Pradesh, India</p>
            <p>📞 +91 00000 00000</p>
            <p>✉️ support@petcart.example</p>
          </div>

          
        </div>
      </section>
    </>
  );
}

export default Home;
