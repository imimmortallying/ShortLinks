import { createAsyncThunk } from "@reduxjs/toolkit";

import $api, { API_URL } from "../axios/axios.api";

import { req_setAllUsersLinks } from "Features/allUsersLinksSlice/allUsersLinksSlice";

interface req_getAllUserslinks {
    link: string;
}

export const req_getAllUserslinks = createAsyncThunk <Number, null, { rejectValue: string }>(
    'req_SendAuthLink',
    async (authData, thunkAPI) => {
        try {
            // определить юзера
            // сделать запрос, исходя из юзера

            // const response = await $api.post<AuthResponse>('/login', authData);
            const response = await $api.get('/allUsersLinks');
            console.log(response)
            thunkAPI.dispatch(req_setAllUsersLinks(response.data.foundLinks))
            return response.status
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.response.status);
        }

    }
)