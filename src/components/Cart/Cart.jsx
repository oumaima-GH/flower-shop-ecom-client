import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCart, deleteFromCart } from '../../redux/actions/cartActions';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart.data || []);
  const cartRef = useRef(null); 

  useEffect(() => {
    dispatch(fetchCart());

    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && isOpen) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isOpen, onClose]);

  const handleViewCart = () => {
    onClose(); 
    navigate('/viewcart');
  };

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(deleteFromCart(productId));
      dispatch(fetchCart());
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    const quantity = Math.max(1, Math.min(10, newQuantity));

    try {
      await dispatch(updateCart(productId, quantity));
      dispatch(fetchCart());
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const calculateTotal = () => {
    if (!Array.isArray(cartItems)) {
      console.error('cartItems is not an array:', cartItems);
      return 0;
    }
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div ref={cartRef} className={`cart-container ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-button" onClick={onClose}>x</button>
      </div>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {Array.isArray(cartItems) && cartItems.map((item) => (
              <li key={item.product.id}>
                <div className="cart-item">
                  <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-title">{item.product.name}</p>
                    <div className="quantity-selector">
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</button>
                    </div>
                    <p className="cart-item-subtotal">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button className="remove-btn" onClick={() => handleRemoveItem(item.product.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="cart-btns">
          <button className="checkout-btn">Checkout</button>
          <button className="view-cart-btn" onClick={handleViewCart}>View Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
