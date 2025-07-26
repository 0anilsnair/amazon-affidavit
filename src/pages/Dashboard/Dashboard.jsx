import "./Dashboard.scss";
import Footer from "../../common/components/Footer/Footer";
import Header from "../../common/components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm?.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCol = collection(db, "products");
      const productsSnapshot = await getDocs(productsCol);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <div className="app-container">
        <Header isAdmin={false} />
        <MainContent
          products={filteredProducts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
