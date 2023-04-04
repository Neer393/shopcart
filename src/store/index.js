import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth.js'
import cartSlice from './cart.js';
import productsSlice from './products.js'

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        cart:cartSlice.reducer,
        products:productsSlice.reducer
    }
});
export default store;