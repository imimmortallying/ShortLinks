import { createAsyncThunk } from "@reduxjs/toolkit";
import $api, { API_URL } from "../../http";
import { logoutUser, req_setUser } from "Features/auth/authSlice";
import axios from "axios";
import { AuthResponse } from "Models/response/AuthResponse";


interface req_AppCheckAuth {
    username: string;
    password: string;
}

export const req_AppCheckAuth = createAsyncThunk <Number, null, { rejectValue: string }>(
    'req_AppCheckAuth',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log(response);
            thunkAPI.dispatch(req_setUser(response.data.username));
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.status;
        } catch (e) {
            // thunkAPI.dispatch(logoutUser());
            console.log(e)
            return thunkAPI.rejectWithValue(e.response.status)
        }

    }
)