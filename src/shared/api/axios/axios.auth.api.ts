import axios from "axios";
import { AuthResponse } from "shared";

export const API_URL = 'http://localhost:5000/api/v1/auth';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error)=>{

    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem('accessToken', response.data.accessToken);
            return $api.request(originalRequest)
        } catch (e) {
            console.log(e, 'не авторизован')
        }
        
    }
    throw error;
})
