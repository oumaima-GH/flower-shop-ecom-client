import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productAction';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.product);
  const loading = useSelector(state => state.product.loading);
  const error = useSelector(state => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products && products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {/* Add more product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Products;
