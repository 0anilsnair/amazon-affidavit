import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import "./AdminDashboard.scss";
import Modal from "../../common/components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    link: "",
    timestamp: ""
  });
  const [refetch, setRefetch] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setNewProduct({ name: "", description: "", link: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.link.trim()) {
      alert("Please enter product name and link");
      return;
    }
    const newEntry = {
      id: products.length + 1,
      ...newProduct,
    };
    setProducts((prev) => [...prev, newEntry]);
    closeModal();
  };

  const onLogout = () => {
    navigate("/login");
  };

  const addProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...newProduct,
        timestamp: new Date(),
      });
      closeModal();
      setRefetch(true);
    } catch (e) {
      console.error("Error adding product: ", e);
    } finally {
      // setRefetch(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-buttons">
          <button className="add-product-btn" onClick={openModal}>
            Add New Product
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>Add New Product</h2>
        <form
          className="add-product-form"
          onSubmit={handleAddProduct}
          noValidate
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name *"
            value={newProduct.name}
            onChange={handleChange}
            required
            autoFocus
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <input
            type="url"
            name="link"
            placeholder="Product Link *"
            value={newProduct.link}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn" onClick={addProduct}>
              Add Product
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <ProductList refetch={refetch} isListLoaded={()=> setRefetch(false)}/>
    </div>
  );
};

export default AdminDashboard;
