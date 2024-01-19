

import axios, { AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "react-query";
// import { useNavigate } from "react-router-dom";

import { AuthResponse, QUERY_KEY } from "shared";
import { $api, API_URL } from "./axios.auth.api";

interface linksResponse {
    links:string
}

export interface signInResponse {
    accessToken: string,
    user: {username:string},
}

export const AuthService = {
    async signin(username: string, password: string): Promise<signInResponse> {
        try {
            const response = await $api.post<signInResponse>('/signin', { username, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data
        } catch (e) {
            console.log(e.response?.data)
        }

    },

    async refresh(): Promise<signInResponse>  {
        try {
            const response = await axios.get<signInResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log('response',response);
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data;
        } catch (e) {
            return e
        }
    },

    // нет необходимости использовать $api т.к. при регистрации я не использую токен
    // поэтому перехватчик не нужен
    async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            return await $api.post<AuthResponse>('/signup', { username, password })
        } catch (e) {
            console.log(e.response?.data)
        }
    },
    
    async logout(): Promise<void> {
        try {
            localStorage.removeItem('accessToken');
            return await $api.delete('/signout');
        } catch (e) {
            console.log(e)
        }
    },


}



