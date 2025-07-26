import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import "./ProductList.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    props?.refetch && fetchProducts();
  }, [props?.refetch]);

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
    } finally {
      setLoading(false);
      props?.isListLoaded();
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="productList">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
