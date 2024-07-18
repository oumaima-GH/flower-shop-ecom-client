export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';

export const DELETE_FROM_CART_REQUEST = 'DELETE_FROM_CART_REQUEST';
export const DELETE_FROM_CART_SUCCESS = 'DELETE_FROM_CART_SUCCESS';
export const DELETE_FROM_CART_FAILURE = 'DELETE_FROM_CART_FAILURE';

export const CLEAR_CART_REQUEST = 'CLEAR_CART_REQUEST';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';

const fetchCart = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CART_REQUEST });

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: FETCH_CART_FAILURE, payload: 'Unauthorized' });
            return Promise.reject('Unauthorized');
        }

        const response = await fetch(`/api/carts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: FETCH_CART_SUCCESS, payload: data.data });
            return Promise.resolve(data.data);
        } else {
            dispatch({ type: FETCH_CART_FAILURE, payload: data.message || 'Failed to fetch cart' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: FETCH_CART_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const addToCart = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: ADD_TO_CART_FAILURE, payload: 'Unauthorized' });
            return Promise.reject('Unauthorized');
        }

        const response = await fetch(`/api/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity })
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.data });
            return Promise.resolve(data.data);
        } else {
            dispatch({ type: ADD_TO_CART_FAILURE, payload: data.message || 'Failed to add to cart' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const updateCart = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_REQUEST });

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: UPDATE_CART_FAILURE, payload: 'Unauthorized' });
            return Promise.reject('Unauthorized');
        }

        const response = await fetch(`/api/carts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity })
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: UPDATE_CART_SUCCESS, payload: data.data });
            return Promise.resolve(data.data);
        } else {
            dispatch({ type: UPDATE_CART_FAILURE, payload: data.message || 'Failed to update cart' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: UPDATE_CART_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const deleteFromCart = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FROM_CART_REQUEST });

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: DELETE_FROM_CART_FAILURE, payload: 'Unauthorized' });
            return Promise.reject('Unauthorized');
        }

        const response = await fetch(`/api/carts`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: data.data });
            return Promise.resolve(data.data);
        } else {
            dispatch({ type: DELETE_FROM_CART_FAILURE, payload: data.message || 'Failed to delete from cart' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: DELETE_FROM_CART_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const clearCart = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_CART_REQUEST });

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: CLEAR_CART_FAILURE, payload: 'Unauthorized' });
            return Promise.reject('Unauthorized');
        }

        const response = await fetch(`/api/carts/clear`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
            return Promise.resolve(data);
        } else {
            dispatch({ type: CLEAR_CART_FAILURE, payload: data.message || 'Failed to clear cart' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: CLEAR_CART_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

export { fetchCart, addToCart, updateCart, deleteFromCart, clearCart };
