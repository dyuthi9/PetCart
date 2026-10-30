
import { useLocation } from "react-router-dom";
import "./Categories.css";

import Toys from "../pages/Toys";
import Pets from "../pages/Pets";
import Food from "../pages/Food";
import Care_Essentials from "../pages/Care_Essentials";
import Funiture from "../pages/Funiture";

function Categories() {
  const location = useLocation();

  // Get the category selected on the homepage
  const selectedCategory = location.state?.category || "Toys";

  const categoryPages = {
    Toys: Toys,
    Pets: Pets,
    Food: Food,
    "Care Essentials": Care_Essentials,
    Furniture: Funiture,
  };

  const SelectedComponent = categoryPages[selectedCategory];

  return (
    <section className="categories-page">
      <div className="category-page-content">
        {SelectedComponent ? (
          <SelectedComponent />
        ) : (
          <p className="text-center">
            Category not found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Categories;
