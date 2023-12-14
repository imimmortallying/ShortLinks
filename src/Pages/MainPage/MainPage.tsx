import { classNames } from "shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss"
import { FC, ReactNode, useCallback, useState } from "react";
import { SendLinkForm } from "widgets";
import { Button, Input, Modal, Typography } from "antd";
import { AuthService } from "Services/AuthService";

interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = ({ className }: MainPageProps) => {

    //modal

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
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    // const handleOk = async () => {

    //     const resp = await fetch('http://localhost:5000/auth/registration',
    //         {
    //             method: 'POST',
    //             headers: { "content-type": "application/json" },
    //             body: JSON.stringify({ username: username, password: password })
    //         })
    //     // .then(res => res.json()); // после этого смогу увидеть и текст


    //     console.log(resp.json())
    //     setModalText('The modal will be closed after two seconds');
    //     setConfirmLoading(true);
    //     // setOpen(false);
    //     setConfirmLoading(false);
    //     // вместо таймера запрос в бд
    // };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Button type="primary" onClick={showModal}>
                Вход/регистрация
            </Button>
            <Modal
                title="Title"
                open={open}
                // onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
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
                    <Button onClick={()=> AuthService.login(username, password)}>Логин</Button>
                    <Button onClick={()=> AuthService.registration(username, password)}>Регистрация</Button>
                </div>

            </Modal>
            <Button onClick={()=> AuthService.logout()}>Выйти</Button>
        </div>
    );
};