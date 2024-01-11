

import axios, { AxiosResponse } from "axios";

import { useMutation, useQueryClient } from "react-query";
// import { useNavigate } from "react-router-dom";

import { AuthResponse, QUERY_KEY } from "shared";
import { $api, API_URL } from "./axios.authApi";

interface linksResponse {
    links:string
}

export const AuthService = {
    async signin(username: string, password: string): Promise<AxiosResponse<signInResponse>> {
        try {
            const response = await $api.post<signInResponse>('/signin', { username, password });
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
            return await $api.delete('/signout');
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

        onError: () => console.log('error in refresh query'),

    })
    
    
    return refreshMutation
}

export function useSignout() {
    const queryClient = useQueryClient();
    const { mutate: signoutMutation } = useMutation({
        
        mutationFn: () => AuthService.logout(),
        onError: () => console.log('error in logout query'),
        onSuccess: () => { 

            queryClient.removeQueries();
         },
        // mutationKey: [QUERY_KEY.user],
    })
    
    
    return signoutMutation
}

interface signInResponse {
    accessToken: string,
    user: {username:string}
}

export function useSignIn(username:string, password:string) {
    const queryClient = useQueryClient();
    const { mutate: signInMutation } = useMutation({
        mutationFn: () => AuthService.signin(username, password),
        onSuccess: (data) => { 

            const username = data?.data.user.username;

            queryClient.setQueryData([QUERY_KEY.user], username);
         },
        onError: () => console.log('error in useSignIn query'),
        // mutationKey: [QUERY_KEY.user, username], // зачем они мне вообще?
        
    })
      
  
    return signInMutation
  }