import $api, { API_URL } from "../http";

import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "Models/response/AuthResponse";

// export default class AuthService {
//     static async login(username:string, password:string): Promise<AxiosResponse<AuthResponse>>{
//         return $api.post<AuthResponse>('/login', {username, password})
//     }

//     static async registration(username:string, password:string): Promise<AxiosResponse<AuthResponse>>{
//         return $api.post<AuthResponse>('/registration', {username, password})
//     }

//     static async logout(): Promise<void>{
//         return $api.post('/logout')
//     }
// }

export const AuthService = {
    async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            const response = await $api.post<AuthResponse>('/login', { username, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response
        } catch (e) {
            console.log(e.response?.data)
        }

    },

    // нет необходимости использовать $api т.к. при регистрации я не использую токен
    // поэтому перехватчик не нужен
    async registration(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            return await $api.post<AuthResponse>('/registration', { username, password })
        } catch (e) {
            console.log(e.response?.data)
        }
    },

    async logout(): Promise<void> {
        try {
            localStorage.removeItem('accessToken');
            return await $api.post('/logout');
        } catch (e) {
            console.log(e)
        }

    },

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data)
        }
    }
}
