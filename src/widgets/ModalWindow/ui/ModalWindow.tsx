import { useState } from "react";
import cls from "./ModalWindow.module.scss";
import { Button, Input, Modal, Typography } from "antd";

import { AuthService, useSignInMutation } from "shared";
import { UseUserFormStateReturn } from "Pages/MainPage/hooks/useUserFormState";
import { useUserStore } from "../zustandStore/user.store";

const { Text } = Typography;

interface ModalWindowProps {
  className?: string;
  isOpened: boolean;
  handleCloseModal: () => void;
  userFormState: UseUserFormStateReturn;
}

export const ModalWindow = ({
  isOpened,
  handleCloseModal,
  userFormState,
}: ModalWindowProps) => {
  
  
  //zustand

  const user = useUserStore((state) => state.username);
  const userStatus = useUserStore((state) => state.status);
  const updateUsername = useUserStore((state) => state.updateUsername);
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);
  console.log('USER: ', user, 'STATUS :', userStatus)



  const [username, setUsername] = useState(null);
  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState(null);
  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const signInMutation = useSignInMutation(username, password);
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <Modal
      title="Title"
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
            // onChange={userFormState.onUsernameChange}
            onChange={onUsernameChange}
            placeholder="Введите логин"
          ></Input>
        </div>
        <div className={cls.inputBlock}>
          <Text>Пароль:</Text>
          <Input
            // onChange={userFormState.onPasswordChange}
            onChange={onPasswordChange}
            placeholder="Введите пароль"
          ></Input>
        </div>
        <div className={cls.inputBlock}>
          <Text>Повторите пароль:</Text>
          <Input></Input>
        </div>
      </div>

      <div className={cls.buttonsBlock}>
        <Button
          onClick={() => {
            signInMutation.mutate(undefined, {
              onSuccess: (data) => {
                updateUsername(data.user.username);
                updateUserStatus('signedin'); 
              },
            });
          }}
          // onClick={() => console.log('ctx',ctx)}
          // loading={ctx.user.isLoading}
        >
          Логин
        </Button>

        {/* <Button
          onClick={() =>
            AuthService.registration(
              userFormState.username,
              userFormState.password
            )
          }
        >
          Регистрация
        </Button> */}
      </div>
    </Modal>
  );
};
