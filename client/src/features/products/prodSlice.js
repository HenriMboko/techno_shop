import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

const API_URL = "/api/products";

export const getProduct = createAsyncThunk(
    "products/get_AllProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);

            return response.data;
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getByIDProduct = createAsyncThunk(
    "products/getAll_ByIDProducts",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`/api/products/${id}`);

            return response.data;
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const productSlice = createSlice({
    name: "prod",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.products = null;
            })
            .addCase(getByIDProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getByIDProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getByIDProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.products = null;
            })
    },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
