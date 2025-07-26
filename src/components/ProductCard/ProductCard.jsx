import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const handleShare = () => alert(`Sharing: ${product.name}`);
  const handleCopy = () => {
    navigator.clipboard.writeText(product.link);
    alert('Product link copied!');
  };
  const handleOpen = () => window.open(product.link, '_blank');

  return (
    <div className='productCard'>
      <div className='productInfo'>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className='productActions'>
        <button onClick={handleCopy}>📋 Copy</button>
        <button onClick={handleOpen}>🔍 Open</button>
      </div>
    </div>
  );
};

export default ProductCard;
