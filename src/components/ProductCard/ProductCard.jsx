import "./ProductCard.scss";

const ProductCard = ({ product, isAdmin, editEvent, deleteEvent }) => {
  
  const handleOpen = () =>
    window.open(product.link, "_blank", "noopener,noreferrer");
  

  return (
    <div
      className={isAdmin ? "product-card" : "product-card clickable"}
      onClick={() => !isAdmin && handleOpen()}
      title="Click to Open"
    >
      <div className="product-image-container">
        <img src={product.image || 'https://blocks.astratic.com/img/general-img-landscape.png'} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price-row"></div>
        {isAdmin && (
          <div className="action-buttons">
            <button className="open-btn" onClick={() => handleOpen(product)}>
              <i className="fas fa-external-link"></i>
              Open
            </button>
            <button className="edit-btn" onClick={() => editEvent(product)}>
              <i className="fas fa-pencil"></i>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteEvent(product)}>
              <i className="fas fa-trash"></i>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
