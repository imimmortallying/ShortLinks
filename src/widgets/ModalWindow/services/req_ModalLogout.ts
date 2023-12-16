import { createAsyncThunk } from "@reduxjs/toolkit";
import $api, { API_URL } from "../../../http";
import { logoutUser } from "Features/auth/authSlice";


interface req_ModalLogout {
    username: string;
    password: string;
}

export const req_ModalLogout = createAsyncThunk <Number, null, { rejectValue: string }>(
    'req_ModalLogout',
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