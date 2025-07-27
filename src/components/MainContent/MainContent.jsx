import "./MainContent.scss";
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
  editEvent,
  types,
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
          {types
            ?.filter((e) => categories?.some((i) => i === e?.name))
            ?.sort((a,b)=> a?.order - b?.order)
            .map((category) => (
              <div
                key={category?.name}
                className={`filter ${
                  activeCategory === category?.name ? "filter-active" : ""
                }`}
                onClick={() => setActiveCategory(category?.name)}
              >
                <i className={`fas ${category?.icon}`}></i>
                {category?.name}
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
