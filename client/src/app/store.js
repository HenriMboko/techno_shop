import { configureStore } from "@reduxjs/toolkit"

import productReducer from "../features/products/prodSlice"
import logger from "redux-logger"
import cartReducer from "../features/products/cartItem"
import authReducer from "../features/auth/authSlice"
import { getCalculTotals } from "../features/products/cartItem"

export const store = configureStore({
    reducer: {
        prod: productReducer,
        cart: cartReducer,
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: import.meta.env.NODE_ENV !== 'production',

})

store.dispatch(getCalculTotals())

