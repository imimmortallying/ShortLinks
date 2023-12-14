import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ModalWindow.module.scss"
import { Button, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { AuthService } from "Services/AuthService";

interface ModalWindowProps {
    className?: string;
    isOpened: boolean;
    handleCloseModal: () => void; 
}

export const ModalWindow = ({isOpened, handleCloseModal}:ModalWindowProps) => {


    // стейты для input
    const [username, setUsername] = useState('');
    const onUsernameChange = (e: any) => {
        setUsername(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    // дефолтная настройка из antd
    const { Text } = Typography;
    
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');






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
                    <Input onChange={onUsernameChange} placeholder="Введите логин"></Input>
                </div>
                <div className={cls.inputBlock}>
                    <Text>Пароль:</Text>
                    <Input onChange={onPasswordChange} placeholder="Введите пароль"></Input>
                </div>
                <div className={cls.inputBlock}>
                    <Text>Повторите пароль:</Text>
                    <Input></Input>
                </div>
            </div>

            <div className={cls.buttonsBlock}>
                <Button onClick={() => AuthService.login(username, password)}>Логин</Button>
                <Button onClick={() => AuthService.registration(username, password)}>Регистрация</Button>
            </div>

        </Modal>
    );
};