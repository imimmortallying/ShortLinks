import { classNames } from "shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss"
import { FC, ReactNode, useCallback, useState } from "react";
import { Button, Input, Modal, Typography } from "antd";
import { AuthService } from "Services/AuthService";
import { ModalWindow } from "widgets/ModalWindow/ModalWindow";
import { req_MainPagelogout } from "Pages/MainPage/services/req_MainPageLogout";
import { useAppDispatch } from "App/hooks/hooks";
import { useSelector } from "react-redux";
import { selectUsername } from "Features/auth/authSlice";
import { SendLinkBlock } from "Features/SendLinkBlock/SendLinkBlock";

interface MainPageProps {
    className?: string;
    // children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = ({ className }: MainPageProps) => {

    const authUsername = useSelector(selectUsername);
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

            <SendLinkBlock></SendLinkBlock>
            <div>
                {authUsername
                    ? <Button onClick={() => dispatchAsync(req_MainPagelogout())}>Выйти</Button>
                    : ''}
            </div>
            
            <div>
                {authUsername
                    ? <Button onClick={() => AuthService.loadLinks()}>Ссылки</Button>
                    : ''}
            </div>

        </div>
    );
};