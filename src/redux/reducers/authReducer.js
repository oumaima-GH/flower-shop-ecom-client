import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
} from '../actions/authAction';

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
                error: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
