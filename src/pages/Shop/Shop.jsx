import React, { useState, useEffect } from 'react';
import './Shop.css';

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const responseData = await response.json();

        if (responseData.status === 'success') {
          const fetchedProducts = responseData.data;

          if (!Array.isArray(fetchedProducts)) {
            throw new Error('Products data is not an array');
          }

          setProducts(fetchedProducts);
        } else {
          throw new Error(responseData.message || 'Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <section className="shop">
        <h1>Shop</h1>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="shop">
      <h1>Shop</h1>
      <p>Showing all {products.length} results</p>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <p className="product-category">{product.category.name}</p>
              <h2 className="product-name">{product.name}</h2>
              <div className="product-pricing">
                <span className="original-price">${product.price.toFixed(2)}</span>
              </div>
              <button className='buy-btn'>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shop;
