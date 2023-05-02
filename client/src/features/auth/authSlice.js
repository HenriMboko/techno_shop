import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

//Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getProfileUser = createAsyncThunk('auth/get_profile',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token

            return await authService.userProfile(token)

        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    })

export const createUser = createAsyncThunk(
    "auth/create_user",
    async (userData, thunkAPI) => {
        try {
            return await authService.registerService(userData);
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login_user",
    async (userData, thunkAPI) => {
        try {
            return await authService.loginService(userData);
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "auth/update_user",
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.updateUser(token, userData);
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);



export const logout = createAsyncThunk("auth/logout", async () => {
    return await localStorage.removeItem("user");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.user = null
        },

        loadUser: (state) => {
            state.user = localStorage.getItem('user')
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(getProfileUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfileUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getProfileUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
