import "./MainContent.scss";
import { useState } from "react";
import ProductList from "../ProductList/ProductList";
import { getWebPageContent } from "../../endpoints/scaper";

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
  const [scrapUrl, setScrapUrl] = useState("");
  const [scrapData, setScrapData] = useState({
    data: undefined,
    isLoading: false,
  });

  const scrapUrlEvent = async () => {
    if(!scrapUrl) {
      return;
    }
    setScrapData({ isLoading: true });
    getWebPageContent(scrapUrl).then((e) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(e?.data, "text/html");
      const title = doc.getElementById("productTitle")?.textContent?.trim();
      const type = doc
        .getElementsByClassName("nav-a-content")?.[0]
        ?.textContent?.trim();
      const image = doc.getElementById("landingImage")?.getAttribute("src");
      setScrapData({
        isLoading: false,
        data: { title, type, image, url: scrapUrl },
      });
      setScrapUrl("");
    });
  };

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

        <div className="scrap-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Paste URL to Scrap"
            value={scrapUrl}
            onChange={(e) => setScrapUrl(e.target.value)}
          />
          <button className="scrap-btn" onClick={() => scrapUrlEvent()}>
            {!scrapData?.isLoading ? (
              <>
                Scrap
                <i className="fas fa-sign-out" style={{marginLeft: '1em'}}></i>
              </>
            ) : (
              <>Scrapping...</>
            )}
          </button>
        </div>

        <div className="filters">
          {types
            ?.filter((e) => categories?.some((i) => i === e?.name))
            ?.sort((a, b) => a?.order - b?.order)
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
