

import axios, { AxiosResponse } from "axios";

import { AuthResponse } from "shared";
import { $api, API_URL } from "./axios.auth.api";

export interface signInResponse {
    accessToken: string,
    user: {username:string},
}

export const AuthService = {
    async signin(username: string, password: string): Promise<signInResponse> {
        try {
            const response = await $api.post<signInResponse>('/signin', { username, password })
            console.log('axiosResponse ', response)
            localStorage.setItem('accessToken', response.data.accessToken);
            // т.е. typeError возникает, когда я пытаюсь установить data в response. И в исключение попадает 
            // не ошибка сервера, а эта typeError. 
            // При этом каким-то хуем, даже когда есть и 404 и typeError, в реакт query вызывается И!!! onSuccess И!!! onError
            // получается, что axios передает в react-query TypeError и react-query считает, что это onSuccess и onError
            return response.data
            // вернуть failed promise, а не просто исключение?

            // то есть получается, что при определенном (возможно) статус коде аксиос не вызывает ошибку
            // но при определенных условиях он все-таки выкинет ошибку
            // во-вторых у меня появляется TypeError. И эта ошибка будет восприниматься как ошибка, только если я сам ее выкину
            // или как это обработать правильно?
        } catch (e) {
            console.log('signin error from axios: ', e)
            throw (e)
            // return e
        }

    },

    async refresh(): Promise<signInResponse>  {
        try {
            const response = await axios.get<signInResponse>(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data;
        } catch (e) {
            throw (e)
        }
    },

    // нет необходимости использовать $api т.к. при регистрации я не использую токен
    // поэтому перехватчик не нужен
    async signup(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            return await $api.post<AuthResponse>('/signup', { username, password })
        } catch (e) {
            console.log('axios sgnup ', e)
            throw (e)
        }
    },
    
    async logout(): Promise<void> {
        try {
            localStorage.removeItem('accessToken');
            return await $api.delete('/signout');
        } catch (e) {
            throw (e)
        }
    },


}



