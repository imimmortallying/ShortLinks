import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainPage, RedirectPage } from "Pages";
import { useRefresh } from "shared";

const App = () => {
//   const checkAuth = useRefresh();
//   // проерка авторизации пользователя при загрузке страницы
//   // как реакт понимает, что ф-я, начинающаяся на use - хук? что такое хук и для чего нужны правила для их использования
//   // почему, например, я не могу использовать хук внутри useEffect?
//   useEffect(() => {
//     checkAuth.enableQuery();
//     // if (localStorage.getItem('accessToken')) {
//     // }
//   }, []);

const checkAuth = useRefresh();

    // console.log('CHECK',checkAuth)
    useEffect(() => {

    checkAuth.enableQuery();

  }, [checkAuth]);

  if (checkAuth.status === "success") {
    // You can render a loading state or null while the app is being initialized
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path=":linkAlias" element={<RedirectPage />} />
          </Routes>
        </BrowserRouter>
      );
  }

  
};

export default App;
