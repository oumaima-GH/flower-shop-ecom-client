export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        const response = await fetch(`api/products`);
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
            return Promise.resolve(data);
        } else {
            dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: data.message || 'Failed to fetch products' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const fetchProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        const response = await fetch(`api/products/${id}`);
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
            return Promise.resolve(data);
        } else {
            dispatch({ type: FETCH_PRODUCT_FAILURE, payload: data.message || 'Failed to fetch product' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const createProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST });
        const response = await fetch(`api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
            return Promise.resolve(data);
        } else {
            dispatch({ type: CREATE_PRODUCT_FAILURE, payload: data.message || 'Failed to create product' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const updateProduct = (id, product) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const response = await fetch(`api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
            return Promise.resolve(data);
        } else {
            dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: data.message || 'Failed to update product' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const response = await fetch(`api/products/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
            return Promise.resolve(data);
        } else {
            dispatch({ type: DELETE_PRODUCT_FAILURE, payload: data.message || 'Failed to delete product' });
            return Promise.reject(data.message);
        }
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};

export { fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct };