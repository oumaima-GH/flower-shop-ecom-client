import React from 'react';
import './Shop.css';

function Shop() {
  const products = [
    {
      id: 1,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-4-400x400.jpg',
      category: 'Flower',
      name: 'Custom Floral Designs',
      originalPrice: 127.00,
      salePrice: 86.00,
      isOnSale: true,
    },
    {
      id: 2,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-2-400x400.jpg',
      category: 'Flower',
      name: 'Periwinkle Flower',
      originalPrice: 239.00,
      salePrice: 199.00,
      isOnSale: true,
    },
    {
      id: 3,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-1-400x400.jpg',
      category: 'Bouquet',
      name: 'Periwinkle Flowers Bouquet',
      originalPrice: 79.00,
      salePrice: 56.00,
      isOnSale: true,
    },
    {
      id: 4,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-7-400x400.jpg',
      category: 'Bouquet',
      name: 'Rose Flower Bouquet',
      originalPrice: 210.00,
      salePrice: 199.00,
      isOnSale: true,
    },
    {
      id: 1,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-4-400x400.jpg',
      category: 'Flower',
      name: 'Custom Floral Designs',
      originalPrice: 127.00,
      salePrice: 86.00,
      isOnSale: true,
    },
    {
      id: 2,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-2-400x400.jpg',
      category: 'Flower',
      name: 'Periwinkle Flower',
      originalPrice: 239.00,
      salePrice: 199.00,
      isOnSale: true,
    },
    {
      id: 3,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-1-400x400.jpg',
      category: 'Bouquet',
      name: 'Periwinkle Flowers Bouquet',
      originalPrice: 79.00,
      salePrice: 56.00,
      isOnSale: true,
    },
    {
      id: 4,
      image: 'https://websitedemos.net/flower-shop-04/wp-content/uploads/sites/1414/2023/10/product-7-400x400.jpg',
      category: 'Bouquet',
      name: 'Rose Flower Bouquet',
      originalPrice: 210.00,
      salePrice: 199.00,
      isOnSale: true,
    },
  ];

  return (
    <section className="shop">
      <h1>Shop</h1>
      <p>Showing all {products.length} results</p>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              {product.isOnSale && <span className="sale-badge">Sale!</span>}
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <p className="product-category">{product.category}</p>
              <h2 className="product-name">{product.name}</h2>
              <div className="product-pricing">
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="sale-price">${product.salePrice.toFixed(2)}</span>
              </div>
              <button className='buy-btn'>Buy</button>

            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shop;
