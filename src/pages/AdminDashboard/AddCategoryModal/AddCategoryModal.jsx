import "./AddCategoryModal.scss";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../common/components/modal/Modal";

const AddCategoryModal = ({
  modalOpen,
  closeModal,
  addCategoryEvent,
  types,
  deleteCategory
}) => {
  const bottomRef = useRef(null);
  const [newProduct, setNewProduct] = useState({
    order: "",
    name: "",
    icon: "",
  });
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setSelectedCategory();
    setCategoryList(types || []);
  }, [types]);

  const handleChange = (e, item) => {
    const { name, value } = e.target;
    setSelectedCategory((prev) => ({ ...prev, [name]: value }));
    setCategoryList((prev) => {
      return prev?.map((e) => {
        if (e?.id === item?.id) {
          return {
            ...e,
            [name]: value,
          };
        } else {
          return e;
        }
      });
    });
  };

  const addCategory = () => {
    const container = bottomRef.current;
    if (container) {
      container.scrollTop = 0;
    }
    if (categoryList?.some((e) => e?.id === "new-product")) {
      alert("Product adding in process");
      return;
    }
    setSelectedCategory({ order: "", name: "", icon: "", id: "new-product" });
    setCategoryList((prev) => [
      { order: "", name: "", icon: "", id: "new-product" },
      ...prev,
    ]);
  };

  const cancelEvent = () => {
    setCategoryList(types);
    setSelectedCategory();
  };

  const saveAction = () => {
    const savedProduct = categoryList?.find(
      (e) => e?.id === selectedCategory?.id
    );
    console.log(savedProduct);
    let req = {
      ...savedProduct,
      order: Number(savedProduct?.order),
    };
    if (savedProduct?.id === "new-product") {
      delete req.id;
    }
    addCategoryEvent(req);
  };

  return (
    <Modal className="category-modal" isOpen={modalOpen} onClose={closeModal}>
      <h2>Category List</h2>
      <form
        className="add-category-form"
        noValidate
        onSubmit={(event) => event?.preventDefault()}
      >
        <div className="type-list-wrapper" ref={bottomRef}>
          {categoryList?.map((e) => {
            return (
              <div className="input-wrapper">
                <input
                  type="text"
                  name="order"
                  placeholder="Order"
                  value={e.order}
                  disabled={e?.id !== selectedCategory?.id}
                  onChange={(event) => handleChange(event, e)}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={e.name}
                  disabled={e?.id !== selectedCategory?.id}
                  onChange={(event) => handleChange(event, e)}
                  required
                />
                <input
                  type="text"
                  name="icon"
                  placeholder="Icon"
                  value={e.icon}
                  disabled={e?.id !== selectedCategory?.id}
                  onChange={(event) => handleChange(event, e)}
                  required
                />
                {e?.id === selectedCategory?.id ? (
                  <>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => cancelEvent()}
                      title="Cancel"
                    >
                       <i className={`fas fa-ban`}></i>
                    </button>

                    <button
                      type="button"
                      className="submit-btn"
                      onClick={() => saveAction()}
                      title="Save"
                    >
                       <i className={`fa fa-plus`}></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="submit-btn"
                      onClick={() => setSelectedCategory(e)}
                      title="Edit"
                    >
                       <i className={`fas fa-edit`}></i>
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteCategory(e)}
                      title="Delete"
                    >
                      <i className={`fas fa-trash`}></i>
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal-buttons">
          <button
            type="submit"
            className="submit-btn"
            onClick={() => addCategory()}
          >
            Add Category
          </button>
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default AddCategoryModal;
