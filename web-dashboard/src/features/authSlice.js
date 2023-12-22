import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    user: null,
    token: localStorage.getItem('lab-user-token') ? JSON.parse(localStorage.getItem('lab-user-token')) : null,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        const { data, navigate } = userData;
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${BASE_URL}/lab/login`, data);
        if (response.data) {
            console.log(response.data.message)
            let token = response.data.token;
            let user = response.data.lab_user;
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            toast.success(response.data.message);
            navigate('/dashboard/home');
            return response.data;
        }
    } catch (e) {
        toast.error(e.response.data.message)
        return thunkAPI.rejectWithValue(e.response.data.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.lab_user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer