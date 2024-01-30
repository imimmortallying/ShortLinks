import cls from "./MainPage.module.scss";

import { FC, useState } from "react";
import { Button, Typography } from "antd";

import { SendLinkBlock } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import { useSignout, useGetAllLinksQuery } from "shared";

import { useUserFormState } from "./hooks/useUserFormState";
import { AllLinksList } from "Features/AllLinksList/ui/AllLinksList";
import { useAliasStore } from "./zustandStore/alias.store";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";
import { ErrorBoundary } from "react-error-boundary";

interface MainPageProps {
  className?: string;
  // children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = () => {
  // zustand
  const selectAlias = useAliasStore((state) => state.alias);
  const userStatus = useUserStore((state) => state.status);
  const setDefaultUserState = useUserStore(
    (state) => state.setDefaultUserState
  );
  // const updateAlias = useAliasStore((state) => state.updateAlias);

    //! как теперь ловить ошибки на нужном уровне?

  // form state - login or signup
  //@ts-ignore
  function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
  
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  enum formStates {
    SIGNUP = "signup",
    SIGNIN = "signin",
  }

  const [formState, setFormState] = useState<formStates>();

  const toggleFormState = () => {
    formState === formStates.SIGNIN
      ? setFormState(formStates.SIGNUP)
      : setFormState(formStates.SIGNIN);
  };

  const setSignupFormState = () => {
    setFormState(formStates.SIGNUP);
  };

  const setSigninFormState = () => {
    setFormState(formStates.SIGNIN);
  };
  //modal state and handlers

  const [isOpened, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [isVisible, setVisible] = useState(false);
  const showAllLinks = () => {
    setVisible(true);
  };

  //antd
  const { Text, Link } = Typography;

  // query
  const signout = useSignout();
  const loadAllLinksQuery = useGetAllLinksQuery();

  return (
    <div className={cls.MainPage}>
      {/* <ErrorBoundary fallbackRender={ModalWindow}> */}
        
      <ModalWindow
        isOpened={isOpened}
        handleCloseModal={handleCloseModal}
        formState={formState}
        onToggleFormState={toggleFormState}
      ></ModalWindow>
      {/* </ErrorBoundary> */}

      <div className={cls.Header}>
        <div className={cls.authButtonsBlock}>
          <Button
            type="primary"
            onClick={() => {
              setSigninFormState(), showModal();
            }}
            block
          >
            Вход
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setSignupFormState(), showModal();
            }}
            block
          >
            Регистрация
          </Button>

          {userStatus === "signedin" && (
            <Button
              onClick={() => {
                signout(), setDefaultUserState();
              }}
              block
            >
              Выйти
            </Button>
          )}
        </div>
      </div>

      <div className={cls.Body}>
        <SendLinkBlock />

        <div className={cls.ResultBlock}>
          <Text className={cls.ResultText}>Результат:</Text>
          {selectAlias && (
            <Link
              className={cls.ResultLink}
              href={"http://localhost:4000/" + selectAlias}
            >
              {"http://localhost:4000/" + selectAlias}
            </Link>
          )}
        </div>
        {userStatus === "signedin" && (
          <div className={cls.AllLinksBlock}>
            <div className={cls.allLinksHeader}>
              <Button
                onClick={() => {
                  showAllLinks(), loadAllLinksQuery.enableQuery();
                }}
              >
                Все мои ссылки
              </Button>
            </div>
            {isVisible && <AllLinksList />}
          </div>
        )}
      </div>
    </div>
    
  );
};
