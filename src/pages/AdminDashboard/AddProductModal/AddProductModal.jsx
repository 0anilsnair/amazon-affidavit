import "./AddProductModal.scss";
import { useEffect, useState } from "react";
import Modal from "../../../common/components/modal/Modal";

const AddProductModal = ({
  modalOpen,
  closeModal,
  handleAddProduct,
  addProduct,
  data,
}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    link: "",
    timestamp: "",
    category: "",
  });

  useEffect(() => {
    setNewProduct(
      data || {
        name: "",
        description: "",
        link: "",
        timestamp: "",
        image: "",
        category: "",
      }
    );
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <h2>{newProduct?.id ? "Edit Product" : "Add New Product"}</h2>
      <form
        className="add-product-form"
        onSubmit={(event) => event?.preventDefault() && handleAddProduct(newProduct)}
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
        <input
          type="url"
          name="image"
          placeholder="Image Link *"
          value={newProduct.image}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Product Type *</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Furniture">Furniture</option>
          <option value="Sports & Fitness">Sports & Fitness</option>
          <option value="Other">Other</option>
        </select>
        <div className="modal-buttons">
          <button
            type="submit"
            className="submit-btn"
            onClick={() => addProduct(newProduct)}
          >
            {newProduct?.id ? "Save Product" : "Add Product"}
          </button>
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default AddProductModal;
