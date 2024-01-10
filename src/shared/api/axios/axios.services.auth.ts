

import axios, { AxiosResponse } from "axios";

import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";

import { AuthResponse } from "shared";
import { $api, API_URL } from "./axios.authApi";

interface linksResponse {
    links:string
}

export const AuthService = {
    async signin(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            const response = await $api.post<AuthResponse>('/signin', { username, password });
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
            return await $api.post<AuthResponse>('/signup', { username, password })
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
    
    async loadLinks(): Promise<AxiosResponse<linksResponse>> {
        try {
            const response = await $api.get<linksResponse>('/links');
            return response
        } catch (e) {
            console.log(e.response?.data)
        }

    },

    async refresh() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true});
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data)
        }
    }
}




export function useRefresh() {
    
    const { mutate: refreshMutation } = useMutation({
        mutationFn: () => AuthService.refresh(),
        // onSuccess: () => { navigate('/sadsada') },
        onError: () => console.log('error in useSignIn query'),
        mutationKey: ['user'],
    })
    
    
    return refreshMutation
}

export function useSignIn(username:string, password:string) {
    // const queryClient = useQueryClient()
    // const navigate = useNavigate();
    // const { enqueueSnackbar } = useSnackbar();
  
    const { mutate: signInMutation } = useMutation({
        mutationFn: () => AuthService.signin(username, password),
        // onSuccess: () => { navigate('/sadsada') },
        onError: () => console.log('error in useSignIn query'),
        
    })
      
  
    return signInMutation
  }