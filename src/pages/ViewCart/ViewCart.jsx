import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCart, deleteFromCart } from '../../redux/actions/cartActions';
import './ViewCart.css';
import { Link } from 'react-router-dom';

const ViewCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = (productId) => {
    dispatch(deleteFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCart(productId, quantity));
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return null;
  }

  return (
    <div className="viewcart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.product.id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-title">{item.product.name}</p>
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.product.id)}>Remove</button>
              </div>
              <div className="cart-total">
        <span>Total: ${calculateTotal().toFixed(2)}</span>
      </div>
            </li>
          ))}
        </ul>
      )}
     
      <Link to="/shop" className="return-btn">Return to Shop</Link>
    </div>
  );
};

export default ViewCart;
