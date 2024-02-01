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
import { AxiosError } from "axios";

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
    // общие
    fillAllFields = "Необходимо заполнить все поля",
    network = 'Ошибка при соединении с сервером',
    // signup
    passwordsNotMatch = "Введенные пароли не совпадают",
    server409Username = 'Пользователь с таким именем уже существует',
    //signin
    server404 = 'Неверный логин или пароль'
  };

  enum successMessages {
    signedup = "Регистрация успешна",
  }

  const [responseMessage, setResponseMessage] = useState<errorMessages |successMessages | 'Заполните поля:' | ''>('Заполните поля:');
  const setMessageOnErrorChange = (message: errorMessages) => {
    setResponseMessage(message);
  };

    // состояние сообщения юзеру - зеленое или красное
    const [messageType, setMessageType] = useState<'success' | 'danger'>(null);
    const changeMessageType = (messageType: 'success' | 'danger') => {
      setMessageType(messageType);
    };

    function isAxiosError(error: any): error is AxiosError {
      return error.isAxiosError === true;
    }

  // ф-ии проверки заполнения полей
  function handleNetworkError() {
    setResponseMessage(errorMessages.network);
    changeMessageType("danger");
  }

function resetFormState() { // очистка полей и сообщения юзеру при смене типа модалки
  setResponseMessage('Заполните поля:');
  changeMessageType(null)

  setUsername('');
  setPassword('');
  setRepeatedPassword('');

  changeIsPasswordsError(false);
  changeIsUsernameError(false);
}
  function handleSignupServerError() { // если ошибка <500, то выводит ошибку юзеру
    setResponseMessage(errorMessages.server409Username);
    changeMessageType("danger");
    changeIsUsernameError(true);
  };

  function handleSigninServerError() { // если пароль или логин не подошли, то выводит ошибку юзеру
    setResponseMessage(errorMessages.server404);
    changeMessageType("danger");
    changeIsUsernameError(true);
    changeIsPasswordsError(true);
  };

  function handleSuccessfullSignup() { // если сервер создал юзера, вывести сообщение в UI
    setResponseMessage(successMessages.signedup);
    changeMessageType('success');
  }

  function checkPasswordFields() { // проверяет совпадение паролей при регистрации
    if (password !== repeatedPassword) {
      setMessageOnErrorChange(errorMessages.passwordsNotMatch);
      changeMessageType("danger");
      changeIsPasswordsError(true);
      return false;
    } else {
      changeIsPasswordsError(false);
      return true;
    }
  };

  function checkAreFieldsFilled() { // проверят, все ли поля заполнены
    if (password.length < 3 || username.length < 3) {
      setMessageOnErrorChange(errorMessages.fillAllFields);
      changeMessageType("danger");
      if (username.length < 3) changeIsUsernameError(true);
      else changeIsUsernameError(false);
      if (password.length < 3) changeIsPasswordsError(true);
      else changeIsPasswordsError(false);
      return false;
    } else {
      // setMessageOnErrorChange(null)
      changeIsPasswordsError(false);
      changeIsUsernameError(false);
      return true;
    };
  };

  // состояния инпутов в зависимости от текущей ошибки
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
      onCancel={()=>{handleCloseModal(), resetFormState()}}
      footer={null}
    >
      {/* <p>{modalText}</p> */}

      <Text type={messageType}>{responseMessage}</Text>
      <div className={cls.inputsBlock}>
        <div className={cls.inputBlock}>
          <Text>Логин:</Text>
          <Input
            status={usernameError ? "error" : ""}
            value={username}
            maxLength={10}
            onChange={onUsernameChange}
            placeholder="Введите логин"
          ></Input>
        </div>
        <div className={cls.inputBlock}>
          <Text>Пароль:</Text>
          <Input
            status={passwordsError ? "error" : ""}
            value={password}
            maxLength={10}
            onChange={onPasswordChange}
            placeholder="Введите пароль"
          ></Input>
        </div>
        {formState === "signup" ? (
          <div className={cls.inputBlock}>
            <Text>Повторите пароль:</Text>
            <Input
              status={passwordsError ? "error" : ""}
              value={repeatedPassword}
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
                if (checkAreFieldsFilled())
                  signInMutation.mutate(undefined, {
                    onError: (error: Error) => {
                      if (isAxiosError(error)){
                        if (error.code === 'ERR_NETWORK') handleNetworkError();
                        if (error.response.status === 404) handleSigninServerError();
                      }
                      
                    },
                    onSuccess: (data) => {
                      // zustand state
                      updateUsername(data.user.username);
                      updateUserStatus("signedin");
                      // modal window local state handling
                      handleCloseModal();
                      resetFormState();
                    },
                  });
              }}
              loading={signInMutation.isPending}
            >
              Войти 
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (checkAreFieldsFilled() && checkPasswordFields())
                  signUpMutation.mutate(undefined, {
                onError:(error: Error)=>{
                  if (isAxiosError(error)){
                    console.log('modal err ',error, error.status)
                    if (error.code === 'ERR_NETWORK') handleNetworkError()
                    if (error.response.status === 409) handleSignupServerError();
                  }
                  // console.log('modal error signup ', error.message)
                },
                onSuccess:()=>{
                  handleSuccessfullSignup();
                }
                });
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
              resetFormState();
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
