
import cls from "./Styles/App.module.scss"
import { MainPage } from "Pages/MainPage/MainPage";
import { useEffect, useState } from "react";
import { req_AppCheckAuth } from "./services/req_AppCheckAuth";
import { useAppDispatch } from "./hooks/hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RedirectPage } from "Pages/RedirectPage/RedirectPage";


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
