import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';
import sideBarReducer from './sideBar/sideBarSlice';
import categoryReducer from './filterProducts/filterProductSlice';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        sideBar: sideBarReducer,
        category: categoryReducer,
        cart: cartReducer,
        user: userReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;