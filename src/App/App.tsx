import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainPage, RedirectPage } from "Pages";
import { useRefreshMutation } from "shared";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundryComponent } from "widgets/ModalWindow/errors/ErrorBoundryComponent";
import { AxiosError } from "axios";
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  const checkAuth = useRefreshMutation();
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);
  const updateUsername = useUserStore((state) => state.updateUsername);

  const notify = (message: string) => toast(message);

  useEffect(() => {
    if (localStorage.getItem('accessToken')){
      checkAuth.mutate(undefined, {
        onSuccess: (data) => {
          updateUserStatus("signedin");
          updateUsername(data.user.username);
        },
        onError:(error: Error)=>{
          if (error instanceof AxiosError && error.code === 'ERR_NETWORK')
          notify('Не удается авторизоваться - нет соединения с сервером')
        }
      });
    }

  }, []);

  // const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <Toaster/>
    <ErrorBoundary FallbackComponent={ErrorBoundryComponent}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path=":linkAlias" element={<RedirectPage />} /> */}
      </Routes>
    </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
