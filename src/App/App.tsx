import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainPage, RedirectPage } from "Pages";
import { useRefreshMutation } from "shared";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";

const App = () => {
  const checkAuth = useRefreshMutation();
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);
  const updateUsername = useUserStore((state) => state.updateUsername);

  useEffect(() => {
    if (localStorage.getItem('accessToken')){
      checkAuth.mutate(undefined, {
        onSuccess: (data) => {
          updateUserStatus("signedin");
          updateUsername(data.user.username);
        },
      });
    }

  }, []);
  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path=":linkAlias" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
    // </QueryClientProvider>
  );
};

export default App;
