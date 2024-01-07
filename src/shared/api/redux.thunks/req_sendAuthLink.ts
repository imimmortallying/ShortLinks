import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import $api, { API_URL } from "../axios/axios.api";
import { req_setAlias } from "Features/resultAliasSlice/resultAliasSlice";
import { useSelector } from "react-redux";
import { selectUsername } from "Features/authSlice/authSlice";

interface req_SendAuthLink {
    link: string;
}

export const req_SendAuthLink = createAsyncThunk <Number, req_SendAuthLink, { rejectValue: string }>(
    'req_SendAuthLink',
    async (authData, thunkAPI) => {
        try {
            // определить юзера
            // сделать запрос, исходя из юзера

            // const response = await $api.post<AuthResponse>('/login', authData);
            const response = await $api.post('/sendLink', { ...authData, authOrAnon: 'auth'});
            console.log(response)
            thunkAPI.dispatch(req_setAlias(response.data.alias))
            return response.status
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.response.status);
        }

    }
)