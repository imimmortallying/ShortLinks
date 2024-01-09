
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainPage, RedirectPage } from "Pages";
import { useAppDispatch } from "shared";

import { req_AppCheckAuth } from "./api/req_AppCheckAuth";


const App = () => {

    const dispatchAsync = useAppDispatch();

    // проерка авторизации пользователя при загрузке страницы
        useEffect(()=>{
            if (localStorage.getItem('accessToken')){
                // AuthService.checkAuth()
                dispatchAsync(req_AppCheckAuth())

            }
        }, []);



    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path=":linkAlias" element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>


    )
}

export default App;

function dispatchAsync(arg0: any) {
    throw new Error("Function not implemented.");
}
