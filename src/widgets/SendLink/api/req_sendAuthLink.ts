import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import $api, { API_URL } from "../../../shared/api/axios/axios.api";
import { req_setAlias } from "../models/resultAliasSlice";

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