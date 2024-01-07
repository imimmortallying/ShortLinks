import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../../../shared/api/axios/axios.api";
import { req_setAlias } from "../models/resultAliasSlice";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface req_SendAnonLink {
    link: string;
}

export const req_SendAnonLink = createAsyncThunk<Number, req_SendAnonLink, { rejectValue: string }>(
    'req_SendAnonLink',
    async (authData, thunkAPI) => {
        try {
            const fpPromise = FingerprintJS.load();

            const fingerprint = async () => {
                // Get the visitor identifier when you need it.
                const fp = await fpPromise;
                const result = await fp.get();
                // console.log(result.visitorId)
                return result.visitorId
            }
            const response = await axios.post(
                `${API_URL}/sendLink`,
                { ...authData, authOrAnon: 'anon', fingerprint: await fingerprint() }, { withCredentials: true }
            );
            // console.log(response)
            thunkAPI.dispatch(req_setAlias(response.data.alias))
            return response.status
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.response.status);
        }

    }
)