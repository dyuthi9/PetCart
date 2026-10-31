
import { useNavigate, useLocation } from "react-router-dom";
import "./Categories.css";

import Toys from "../pages/Toys";
import Pets from "../pages/Pets";
import Food from "../pages/Food";
import Care_Essentials from "../pages/Care_Essentials";
import Funiture from "../pages/Funiture";

import {
  FaBone,
  FaPaw,
  FaBowlFood,
  FaBriefcaseMedical,
  FaCouch,
} from "react-icons/fa6";

function Categories() {

  const navigate = useNavigate();
  const location = useLocation();

  const selectedCategory = location.state?.category || "Toys";

  const openCategory = (category) => {
    navigate("/categories", {
      state: { category },
    });
  };

  const categoryPages = {
    Toys: Toys,
    Pets: Pets,
    Food: Food,
    "Care Essentials": Care_Essentials,
    Furniture: Funiture,
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

  const SelectedComponent = categoryPages[selectedCategory];

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
              <div className="category-icon">
                {category.icon}
              </div>

              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="categories-page">
        <div className="category-page-content">
          {SelectedComponent ? (
            <SelectedComponent />
          ) : (
            <p className="text-center">Category not found.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Categories;
