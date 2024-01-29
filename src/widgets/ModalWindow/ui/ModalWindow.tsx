import { useState } from "react";
import cls from "./ModalWindow.module.scss";
import { Button, Input, Modal, Typography } from "antd";

import { AuthService, useSignInMutation } from "shared";
// import { UseUserFormStateReturn } from "Pages/MainPage/hooks/useUserFormState";
import { useUserStore } from "../zustandStore/user.store";
import { useSignUpMutation } from "shared/api/query/query.hooks";

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

  const [username, setUsername] = useState(null);
  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState(null);
  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const [repeatedPassword, setRepeatedPassword] = useState(null);
  const onRepeatedPasswordChange = (e: any) => {
    setRepeatedPassword(e.target.value);
  };

  //query
  const signInMutation = useSignInMutation(username, password);
  const signUpMutation = useSignUpMutation(username, password);
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <Modal
      title={formState}
      open={isOpened}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCloseModal}
      footer={null}
    >
      {/* <p>{modalText}</p> */}
      <div className={cls.inputsBlock}>
        <div className={cls.inputBlock}>
          <Text>Логин:</Text>
          <Input
            onChange={onUsernameChange}
            placeholder="Введите логин"
          ></Input>
        </div>
        <div className={cls.inputBlock}>
          <Text>Пароль:</Text>
          <Input
            onChange={onPasswordChange}
            placeholder="Введите пароль"
          ></Input>
        </div>
        {formState === "signup" ? (
          <div className={cls.inputBlock}>
            <Text>Повторите пароль:</Text>
            <Input
              onChange={onRepeatedPasswordChange}
              placeholder="Повторите пароль"
              
            ></Input>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={cls.buttonsBlock}>
        {formState === "signin" ? (
          <Button
            onClick={() => {
              signInMutation.mutate(undefined, {
                onSuccess: (data) => {
                  updateUsername(data.user.username);
                  updateUserStatus("signedin");
                },
              });
            }}
            // loading={ctx.user.isLoading}
          >
            Войти
          </Button>
        ) : (
          <Button
            onClick={() => {
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
            onToggleFormState()
          }}
        >
          {formState === "signin"
            ? "Еще нет аккаунта? Регистрация"
            : "Уже есть аккаунт? Войти"}
        </Button>
      </div>
    </Modal>
  );
};
