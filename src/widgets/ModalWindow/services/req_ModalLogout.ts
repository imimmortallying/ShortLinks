import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import $api, { API_URL } from "../../../http";
import { AuthResponse } from "Models/response/AuthResponse";
import { req_setUser } from "Features/counter/authSlice";

interface req_ModalRegistration {
    username: string;
    password: string;
}

export const req_ModalRegistration = createAsyncThunk <Number, req_ModalRegistration, { rejectValue: string }>(
    'req_ModalRegistration',
    async (authData, thunkAPI) => {
        try {
            const response = await $api.post<AuthResponse>('/registration', authData)
            console.log(response)
            return response.status
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e.response.status)
        }

    }
)