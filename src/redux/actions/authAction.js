export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT = 'LOGOUT';

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const response = await fetch(`api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        if (response.ok) {
            const { token, user } = result.data;
            dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); 
            return Promise.resolve(result);
        } else {
            dispatch({ type: LOGIN_FAILURE, payload: result.message || 'Login failed' });
            return Promise.reject(result.message);
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error.message);
    }
};


const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const response = await fetch(`api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({ type: REGISTER_SUCCESS, payload: { token: data.token, user: data.user } });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role); 
            return Promise.resolve(data);
        } else {
            dispatch({ type: REGISTER_FAILURE, payload: data.message || 'Registration failed' });
            return Promise.reject(data);
        }
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message || 'Unexpected Error' });
        return Promise.reject(error);
    }
};

const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    dispatch({ type: LOGOUT });
};

export { login, register, logout };
