import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    CartTotalAmount: 0,
    shippingaddress: localStorage.getItem("shippingaddress")
        ? JSON.parse(localStorage.getItem("shippingaddress"))
        : {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const Shipping = createAsyncThunk('cart')

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reset: (state) => {
            (state.isError = false),
                (state.isLoading = false),
                (state.isSuccess = false),
                (state.message = "");
        },

        addCartItems: (state, action) => {
            const ItemIndex = state.cartItems.findIndex(
                (products) => products._id === action.payload._id
            );

            if (ItemIndex >= 0) {
                state.cartItems[ItemIndex].cartQuantity += 1;
                toast.info("Increased product quantity");
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} add to Cart`);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            toast.warning(`${action.payload.name} Remove to Cart`);
        },
        getCalculTotals: (state) => {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    },
    extraReducers: () => {
        // builder
        //     .addCase(cartItemSlice.pending, (state) => {
        //         state.isLoading = true;
        //     })
        //     .addCase(cartItemSlice.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.isSuccess = true;
        //         state.products = action.payload;
        //     })
        //     .addCase(cartItemSlice.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.isError = true;
        //         state.message = action.payload;
        //         state.products = null;
        //     })
    },
});

export const { reset, addCartItems, removeFromCart, getCalculTotals } =
    cartSlice.actions;

export default cartSlice.reducer;
