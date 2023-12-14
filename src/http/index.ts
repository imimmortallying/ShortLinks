import axios from "axios";

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config:any)=>{
    config.headers.Authrization = `Bearer ${localStorage.getItem('refreshToken')}`
    return config;
})

export default $api;