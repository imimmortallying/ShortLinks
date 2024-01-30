import { useState } from "react";
("use client");
import cls from "./ModalWindow.module.scss";
import { Button, Input, Modal, Typography } from "antd";

import { AuthService, useSignInMutation } from "shared";
// import { UseUserFormStateReturn } from "Pages/MainPage/hooks/useUserFormState";
import { useUserStore } from "../zustandStore/user.store";
import { useSignUpMutation } from "shared/api/query/query.hooks";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundryComponent } from "../errors/ErrorBoundryComponent";

const { Text } = Typography;

interface ModalWindowProps {
  className?: string;
  isOpened: boolean;
  handleCloseModal: () => void;
  onToggleFormState: () => void;
  formState: string;
  // userFormState: UseUserFormStateReturn;
}

export const ModalWindow = ({
  isOpened,
  handleCloseModal,
  onToggleFormState,
  formState,
}: ModalWindowProps) => {
  //zustand

  // const user = useUserStore((state) => state.username);
  // const userStatus = useUserStore((state) => state.status);
  const updateUsername = useUserStore((state) => state.updateUsername);
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);

  // states

  const [username, setUsername] = useState("");
  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState("");
  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const [repeatedPassword, setRepeatedPassword] = useState("");
  const onRepeatedPasswordChange = (e: any) => {
    setRepeatedPassword(e.target.value);
  };

  // form state
  enum errorMessages {
    fillAllFields = "Необходимо заполнить все поля",
    passwordsNotMatch = "Введенные пароли не совпадают",
  }

  const [errorMessage, setErrorMessage] = useState("");
  const setMessageOnErrorChange = (message: errorMessages) => {
    setErrorMessage(message);
  };

  // ф-ии проверки заполнения полей
  function checkPasswordFields() {
    if (password != repeatedPassword) {
      setMessageOnErrorChange(errorMessages.passwordsNotMatch);
      changeIsPasswordsError(true);
      return false;
    } else {
      changeIsPasswordsError(false);
      return true
    };
  }

  function checkAreFieldsFilled() {
    if (password.length < 3 || username.length < 3) {
      setMessageOnErrorChange(errorMessages.fillAllFields);
      changeIsUsernameError(true);
      return false;
    } else {
      changeIsUsernameError(false)
      return true
    };
  }

  // состояние инпутов в зависимости от текущей ошибки

  const [usernameError, setIsUsernameError] = useState(false);
  const changeIsUsernameError = (isError: boolean) => {
    setIsUsernameError(isError);
  };

  const [passwordsError, setIsPasswordsError] = useState(false);
  const changeIsPasswordsError = (isError: boolean) => {
    setIsPasswordsError(isError);
  };

  //query
  const signInMutation = useSignInMutation(username, password);
  const signUpMutation = useSignUpMutation(username, password);
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    // <ErrorBoundary FallbackComponent={ErrorBoundryComponent}>
    <Modal
      title={formState}
      open={isOpened}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCloseModal}
      footer={null}
    >
      {/* <p>{modalText}</p> */}

      <div>{errorMessage}</div>
      <div className={cls.inputsBlock}>
        <div className={cls.inputBlock}>
          <Text>Логин:</Text>
          <Input
            status={usernameError ? 'error' : ''}
            maxLength={10}
            onChange={onUsernameChange}
            placeholder="Введите логин"
          ></Input>
        </div>
        <div className={cls.inputBlock}>
          <Text>Пароль:</Text>
          <Input
          status={passwordsError ? 'error' : ''}
            maxLength={10}
            onChange={onPasswordChange}
            placeholder="Введите пароль"
          ></Input>
        </div>
        {formState === "signup" ? (
          <div className={cls.inputBlock}>
            <Text>Повторите пароль:</Text>
            <Input
            status={passwordsError ? 'error' : ''}
              maxLength={10}
              onChange={onRepeatedPasswordChange}
              placeholder="Повторите пароль"
            ></Input>
          </div>
        ) : (
          ""
        )}
      </div>

      <ErrorBoundary FallbackComponent={ErrorBoundryComponent}>
        <div className={cls.buttonsBlock}>
          {formState === "signin" ? (
            <Button
              onClick={() => {
                if (checkAreFieldsFilled() && checkPasswordFields())
                signInMutation.mutate(undefined, {
                  onError: (error) => {
                    console.error("Sign-in err onError: ", error);
                  },
                  onSuccess: (data) => {
                    // console.log('DATA ', data) // никакой ошибки нет, хотя я выбрасываю исключение из аксиос
                    updateUsername(data.user.username);
                    updateUserStatus("signedin");
                  },
                });
              }}
              // onClick={()=>{throw new Error('123')}}
              // loading={ctx.user.isLoading}
            >
              Войти
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (checkAreFieldsFilled() && checkPasswordFields())
                  signUpMutation.mutate();
              }}
              // loading={ctx.user.isLoading}
            >
              Зарегистрироваться
            </Button>
          )}

          <Button
            type="link"
            onClick={() => {
              onToggleFormState();
            }}
          >
            {formState === "signin"
              ? "Еще нет аккаунта? Регистрация"
              : "Уже есть аккаунт? Войти"}
          </Button>
        </div>
      </ErrorBoundary>
    </Modal>
    // </ErrorBoundary>
  );
};
