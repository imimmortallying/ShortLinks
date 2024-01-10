import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../../shared/api/axios/axios.authApi";
import { logoutUser } from "widgets/SendLink/models/authSlice";


interface req_MainPagelogout {
    username: string;
    password: string;
}

export const req_MainPagelogout = createAsyncThunk <Number, null, { rejectValue: string }>(
    'req_MainPagelogout',
    async (authData, thunkAPI) => {
        try {
            const response =  await $api.post('/logout');
            localStorage.removeItem('accessToken');
            thunkAPI.dispatch(logoutUser());
            return response.status;
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e.response.status)
        }

    }
)