import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import "./ProductList.scss";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts(props?.products || []);
  }, [props?.products]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="productList">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={props?.isAdmin}
            deleteEvent={props?.deleteEvent}
            editEvent={props?.editEvent}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
