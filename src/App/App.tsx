
import { SendRequest } from "Features/Request/SendRequest";
import cls from "./Styles/App.module.scss"
import { MainPage } from "Pages/MainPage/MainPage";
import { useEffect, useState } from "react";
import { AuthService } from "Services/AuthService";

const App = () => {

    // проерка авторизации пользователя при загрузке страницы
        useEffect(()=>{
            if (localStorage.getItem('accessToken')){
                AuthService.checkAuth()
            }
        }, [])

    return (

        <MainPage>
            {/* <SendRequest/> */}

        </MainPage>

    )
}

export default App;