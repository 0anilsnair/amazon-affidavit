import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import "./ProductList.scss";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(()=> {
  console.log('props?.products', props?.products);
  
  setProducts(props?.products || [])
}, [props?.products])


  if (loading) return <p>Loading products...</p>;

  return (
    <div className="productList">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <>
          <ProductCard key={product.id} product={product} />
          </>
        ))
      )}
    </div>
  );
};

export default ProductList;
