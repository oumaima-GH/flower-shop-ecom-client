// cartReducer.js

import {
    FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    UPDATE_CART_SUCCESS,
    DELETE_FROM_CART_SUCCESS,
    CLEAR_CART_SUCCESS,
  } from '../actions/cartActions';
  
  const initialState = {
    cart: {
      data: [], 
      loading: false,
      error: null,
    },
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CART_REQUEST:
        case ADD_TO_CART_REQUEST:
        return {
          ...state,
          cart: {
            ...state.cart,
            loading: true,
            error: null,
          },
        };
      case FETCH_CART_SUCCESS:
      case ADD_TO_CART_SUCCESS:
      case UPDATE_CART_SUCCESS:
      case DELETE_FROM_CART_SUCCESS:
      case CLEAR_CART_SUCCESS:
        return {
          ...state,
          cart: {
            ...state.cart,
            data: action.payload,
            loading: false,
            error: null,
          },
        };
      case FETCH_CART_FAILURE:
        return {
          ...state,
          cart: {
            ...state.cart,
            loading: false,
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  