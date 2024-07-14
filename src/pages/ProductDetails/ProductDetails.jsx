import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; 
import BestSelling from '../../components/BestSelling/BestSelling';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const responseData = await response.json();

        if (responseData.status === 'success') {
          setProduct(responseData.data);
        } else {
          throw new Error(responseData.message || 'Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 10) return; 
    setQuantity(quantity + 1); 
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const categories = Array.isArray(product.category) ? product.category.map(cat => cat.name) : [product.category.name];

  return (
    <>
    <div className="product-details-container">
      <div className="prod-details">
        <div className="prod-images">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
        <div className="prod-info">
          <p className="prod-category">{categories.join(', ')}</p>
          <h1>{product.name}</h1>
          <p className="prod-price">
            <span>${product.price}<span className='free'> & Free Shipping</span></span>
          </p>
          <p className="prod-description">{product.description}</p>
          <div className="quantity-add-to-cart">
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={handleDecreaseQuantity}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={handleIncreaseQuantity}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          </div>
          <hr />
          <div className="additional-info">
            <p>Free shipping on orders over $50!</p>
            <ul>
              <li><FontAwesomeIcon icon={faCircleCheck} /> No-Risk Money Back Guarantee!</li>
              <li><FontAwesomeIcon icon={faCircleCheck} /> No Hassle Refunds</li>
              <li><FontAwesomeIcon icon={faCircleCheck} /> Secure Payments</li>
            </ul>
          </div>
          <div className='safe-checkout'>Guaranteed Safe Checkout</div>
          <hr />
          <div className="payment-icons">
            <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="Visa" />
            <img src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png" alt="Mastercard" />
            <img src="https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/american_express-512.png" alt="American Express" />
            <img src="https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/discover-512.png" alt="Discover" />
          </div>
        </div>
      </div>
    </div>
          <BestSelling />
</>
  );
};

export default ProductDetails;
