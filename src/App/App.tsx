
import cls from "./Styles/App.module.scss"
import { MainPage } from "Pages/MainPage/MainPage";
import { useEffect, useState } from "react";
import { req_AppCheckAuth } from "./services/req_AppCheckAuth";
import { useAppDispatch } from "./hooks/hooks";


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

        <MainPage>

        </MainPage>

    )
}

export default App;

function dispatchAsync(arg0: any) {
    throw new Error("Function not implemented.");
}
