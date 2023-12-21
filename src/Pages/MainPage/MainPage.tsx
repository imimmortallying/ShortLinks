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
            <ModalWindow isOpened={isOpened} handleCloseModal={handleCloseModal}></ModalWindow>

            <div className={cls.Header}>

                <div className={cls.authButtonsBlock}>

                    <Button type="primary" onClick={showModal} block>
                        Вход/регистрация
                    </Button>

                    {authUsername
                        ? <Button onClick={() => dispatchAsync(req_MainPagelogout())} block>Выйти</Button>
                        : ''
                    }

                </div>



            </div>

            <div className={cls.Body}>

                <SendLinkBlock></SendLinkBlock>

                <div className={cls.ResultBlock}>
                    <div className={cls.ResultText}>Результат:</div>
                    <div className={cls.ResultLink}>Рез</div>
                </div>

                {authUsername
                    ?
                    <div className={cls.AllLinksBlock}>
                        <Button onClick={() => AuthService.loadLinks()} >Ссылки</Button>
                    </div>
                    : ''

                }


            </div>









        </div>
    );
};