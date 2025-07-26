import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(product.link);
    alert("Product link copied!");
  };

  const handleOpen = () =>
    window.open(product.link, "_blank", "noopener,noreferrer");

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: product.link,
        })
        .catch(console.error);
    } else {
      alert(`Sharing not supported. Product: ${product.name}`);
    }
  };

  return (
    <div className="product-card" onClick={()=> handleOpen()} title="Click to Open">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price-row">
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
