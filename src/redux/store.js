import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';

import  authReducer  from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;