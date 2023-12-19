import { AuthResponse } from "Models/response/AuthResponse";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const API_URL = 'http://localhost:5000';

const $api = axios.create({
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
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        // флаг при первой отправке ставлю тру, чтобы не запустить бесконечный цикл в случае просроченого и аксес и рефреш токенов
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem('accessToken', response.data.accessToken);
            return $api.request(originalRequest)
        } catch (e) {
            console.log(e, 'не авторизован')
        }
        // не совсем понимаю как тут пробрасывается ошибка на верхний уровень, но это для случая, когда ошибка != 401
        throw error;
    }
})

export default $api;