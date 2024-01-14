import { useState } from "react";
import cls from "./ModalWindow.module.scss";
import { Button, Input, Modal, Typography } from "antd";

import { AuthService } from "shared";
import { UseUserFormStateReturn } from "Pages/MainPage/hooks/useUserFormState";
import { useMainPageContext } from "Pages/MainPage/MainPage.context";

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

  const ctx = useMainPageContext();
  
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
            onChange={userFormState.onUsernameChange}
            placeholder="Введите логин"
          ></Input>
        </div>
        <div className={cls.inputBlock}>
          <Text>Пароль:</Text>
          <Input
            onChange={userFormState.onPasswordChange}
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
          onClick={() => ctx.user.setEnabled(true)}
          loading={ctx.user.isLoading}
        >
          Логин
        </Button>

        <Button
          onClick={() =>
            AuthService.registration(
              userFormState.username,
              userFormState.password
            )
          }
        >
          Регистрация
        </Button>
      </div>
    </Modal>
  );
};
