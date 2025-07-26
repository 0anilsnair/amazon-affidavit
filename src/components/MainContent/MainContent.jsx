import './MainContent.scss'
import { useState } from "react";
import ProductList from "../ProductList/ProductList";

const MainContent = ({
  isAdmin,
  products,
  searchTerm,
  setSearchTerm,
  categories,
  activeCategory,
  setActiveCategory,
  deleteEvent,
  editEvent
}) => {

  return (
    <main className="main-content">
      <div className="search-container">
        <h1 className="search-title">Product Catalog</h1>
        <p className="search-subtitle">
          Browse our collection of high-quality products
        </p>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          {categories.map((category) => (
            <div
              key={category}
              className={`filter ${
                activeCategory === category ? "filter-active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "All" && <i className="fas fa-th-large"></i>}
              {category === "Electronics" && <i className="fas fa-laptop"></i>}
              {category === "Home & Kitchen" && <i className="fas fa-home"></i>}
              {category === "Furniture" && <i className="fas fa-chair"></i>}
              {category === "Sports & Fitness" && (
                <i className="fas fa-dumbbell"></i>
              )}
              {category === "Other" && <i className="fas fa-cube"></i>}
              {category}
            </div>
          ))}
        </div>
      </div>

      <ProductList 
        products={products} 
        isAdmin={isAdmin}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
        />
    </main>
  );
};


export default MainContent;