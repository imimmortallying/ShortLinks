
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'

import { useAppDispatch } from "shared";
import { MainPage, RedirectPage } from "Pages";

import { req_AppCheckAuth } from "./api/req_AppCheckAuth";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
    const queryClient = new QueryClient();
    const dispatchAsync = useAppDispatch();



    // проерка авторизации пользователя при загрузке страницы
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            // AuthService.checkAuth()
            dispatchAsync(req_AppCheckAuth())

        }
    }, []);



    return (
        <QueryClientProvider client={queryClient}>
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path=":linkAlias" element={<RedirectPage />} />
                </Routes>
            </BrowserRouter>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>


    )
}

export default App;
