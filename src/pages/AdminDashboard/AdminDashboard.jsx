import "./AdminDashboard.scss";
import Footer from "../../common/components/Footer/Footer";
import Header from "../../common/components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { analytics, db } from "../../config/firebase";
import AddProductModal from "./AddProductModal/AddProductModal";
import DeleteModal from "../../common/components/DeleteModal/DeleteModal";
import { logEvent } from "firebase/analytics";

const AdminDashboard = () => {
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
  const [modalOpen, setModelOpen] = useState(false);
  const [editData, setEditData] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    logEvent(analytics, "page_view", {
      page: "Admin Page",
    });
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

  const addProductEvent = () => {
    setEditData();
    setModelOpen(true);
  };

  const handleAddProduct = (data) => {
    e.preventDefault();
    if (
      !data.name.trim() ||
      !data.link.trim() | !data.category.trim() ||
      !data.image.trim()
    ) {
      alert("Please enter mandatory fields");
      return;
    }
    const newEntry = {
      id: products.length + 1,
      ...data,
    };
    setProducts((prev) => [...prev, newEntry]);
    closeModal();
  };

  const addProduct = async (data) => {
    try {
      if (
        !data.name.trim() ||
        !data.link.trim() | !data.category.trim() ||
        !data.image.trim()
      ) {
        alert("Please enter mandatory fields");
        return;
      }
      if (!data?.id) {
        const docRef = await addDoc(collection(db, "products"), {
          ...data,
          timestamp: new Date(),
        });
        logEvent(analytics, "add_to_cart", {
          action: "Add Product",
        });
      } else {
        const docRef = doc(db, "products", data?.id);
        await updateDoc(docRef, {
          ...data,
          timestamp: new Date(),
        });
        setEditData();
        logEvent(analytics, "add_shipping_info", {
          action: "Edit Product",
        });
      }

      setModelOpen(false);
      await fetchProducts();
    } catch (e) {
      console.error("Error adding product: ", e);
    }
  };

  const editEvent = (product) => {
    setEditData(product);
    setModelOpen(true);
  };

  const deleteEvent = (product) => {
    setDeleteModalOpen(true);
    setEditData(product);
  };

  const deleteEventAction = async () => {
    const docRef = doc(db, "products", editData?.id);
    await deleteDoc(docRef);
    setDeleteModalOpen(false);
    await fetchProducts();
    logEvent(analytics, "remove_from_cart", {
      action: "Delete Product",
    });
  };

  return (
    <div>
      <AddProductModal
        modalOpen={modalOpen}
        data={editData}
        closeModal={() => setModelOpen(false)}
        handleAddProduct={handleAddProduct}
        addProduct={addProduct}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={deleteEventAction}
        itemName={editData?.name}
      />
      <div className="app-container">
        <Header isAdmin={true} addProductEvent={addProductEvent} />
        <MainContent
          isAdmin={true}
          products={filteredProducts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          deleteEvent={(product) => deleteEvent(product)}
          editEvent={(product) => editEvent(product)}
        />
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
