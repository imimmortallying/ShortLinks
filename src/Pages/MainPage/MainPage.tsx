import { classNames } from "shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss"
import { FC, ReactNode, useCallback, useState } from "react";
import { Button, Input, Modal, Typography } from "antd";
import { AuthService } from "Services/AuthService";
import { ModalWindow } from "widgets/ModalWindow/ModalWindow";
import { req_ModalLogout } from "widgets/ModalWindow/services/req_ModalLogout";
import { useAppDispatch } from "App/hooks/hooks";

interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = ({ className }: MainPageProps) => {

    const dispatchAsync = useAppDispatch();

    //modal state and handlers
    const [isOpened, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
 
    const handleCloseModal = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Button type="primary" onClick={showModal}>
                Вход/регистрация
            </Button>

            <ModalWindow isOpened={isOpened} handleCloseModal={handleCloseModal}></ModalWindow>

            <Button onClick={()=> dispatchAsync(req_ModalLogout())}>Выйти</Button>
        </div>
    );
};