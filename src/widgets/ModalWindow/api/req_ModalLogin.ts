import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import $api, { API_URL } from "../../../shared/api/axios/axios.api";
import { req_setUser } from "widgets/SendLink/models/authSlice";
import { AuthResponse } from "shared";

interface req_ModalLogin {
    username: string;
    password: string;
}

export const req_ModalLogin = createAsyncThunk <Number, req_ModalLogin, { rejectValue: string }>(
    'req_ModalLogin',
    async (authData, thunkAPI) => {
        try {
            const response = await $api.post<AuthResponse>('/signin', authData);
            console.log(response)
            localStorage.setItem('accessToken', response.data?.accessToken);
            thunkAPI.dispatch(req_setUser(response.data.username))
            return response.status
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.response.status);
        }

    }
)