
import "./Home.css";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

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
            products.slice(0, 10).map((product) => (
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

  <div className="about-heading">
    <span>🐾 ABOUT PETCART</span>
    <h1>Making Pet Shopping Simple & Convenient</h1>
    <p>
      Everything your beloved pets need, all in one place.
    </p>
  </div>

  <div className="about-content">

    <p className="about-intro">
      PetCart is an online pet store that brings together a wide
      range of products for your beloved pets. From nutritious food
      and exciting toys to comfortable furniture and everyday care
      essentials, we make it easy to find everything your pets need.
      Our platform provides a convenient shopping experience with
      user registration, secure login, cart management and order
      management.
    </p>

    <div className="about-cards">

      <div className="about-card">
        <span className="about-icon">🛍️</span>
        <h3>Wide Product Collection</h3>
        <p>
          Browse different categories of pet food, toys,
          accessories, furniture and care essentials.
        </p>
      </div>

      <div className="about-card">
        <span className="about-icon">🔐</span>
        <h3>Easy & Secure Shopping</h3>
        <p>
          Register, log in, manage your shopping cart
          and conveniently place your orders.
        </p>
      </div>

      <div className="about-card">
        <span className="about-icon">💚</span>
        <h3>Convenient Pet Care</h3>
        <p>
          Find essential products for your pets and
          make their everyday shopping easier.
        </p>
      </div>

    </div>
  </div>
</section>

{/* ---------- CONTACT ---------- */}
<section className="home1 contact-section" id="contact">

  <div className="contact-heading">
    <span>📞 CONTACT PETCART</span>
    <h1>Let's Connect With You!</h1>
    <p>
      We're always happy to help you with your shopping experience.
    </p>
  </div>

  <div className="contact-container">

    <div className="contact-info">

      <div className="contact-item">
        <span>📍</span>
        <div>
          <h3>Our Location</h3>
          <p>Vijayawada, Andhra Pradesh, India</p>
        </div>
      </div>

      <div className="contact-item">
        <span>📧</span>
        <div>
          <h3>Email Support</h3>
          <p>Contact our support team for product and order-related queries.</p>
        </div>
      </div>

      <div className="contact-item">
        <span>🛒</span>
        <div>
          <h3>Shopping Assistance</h3>
          <p>Need help choosing products? Explore our pet product collections.</p>
        </div>
      </div>

    </div>

    <div className="contact-message">
      <span>🐶 🐱 🐾</span>
      <h2>We're Here for Every Paw!</h2>
      <p>
        Thank you for choosing PetCart.
        Making pet shopping easier is what we love to do.
      </p>

      <button
        className="contact-shop-btn"
        onClick={() => navigate("/categories")}
      >
        Explore Categories →
      </button>
    </div>

  </div>
</section>
    </>
  );
}

export default Home;
