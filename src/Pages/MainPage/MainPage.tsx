import { classNames } from "shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss"
import { FC, ReactNode, useCallback, useState } from "react";
import { Button, Input, Modal, Typography } from "antd";
import { AuthService } from "Services/AuthService";
import { ModalWindow } from "widgets/ModalWindow/ModalWindow";

interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = ({ className }: MainPageProps) => {

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

            <Button onClick={()=> AuthService.logout()}>Выйти</Button>
        </div>
    );
};