import { classNames } from "shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss";

import { FC, ReactNode, useCallback, useState } from "react";
import { Button, Input, Modal, Typography } from "antd";
import { AuthService } from "Services/AuthService";
import { ModalWindow } from "widgets/ModalWindow/ModalWindow";
import { req_MainPagelogout } from "Pages/MainPage/services/req_MainPageLogout";
import { useAppDispatch } from "App/hooks/hooks";
import { useSelector } from "react-redux";
import { selectUsername } from "Features/authSlice/authSlice";
import { SendLinkBlock } from "Features/SendLinkBlock/SendLinkBlock";
import { selectAlias } from "Features/resultAliasSlice/resultAliasSlice";
import { req_getAllUserslinks } from "Features/SendLinkBlock/services/req_getAllUsersLinks";
import { selectAllUsersLinks } from "Features/allUsersLinksSlice/allUsersLinksSlice";

interface MainPageProps {
    className?: string;
    // children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = ({ className }: MainPageProps) => {

    const authUsername = useSelector(selectUsername);
    const aliasRes = useSelector(selectAlias);
    const allUsersLinks = useSelector(selectAllUsersLinks);

    const dispatchAsync = useAppDispatch();

    const { Text, Link } = Typography;

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

                <SendLinkBlock />

                <div className={cls.ResultBlock}>
                    <Text className={cls.ResultText}>Результат:</Text>
                    <Link className={cls.ResultLink} href={aliasRes}>{aliasRes}</Link>
                </div>

                {authUsername
                    ?
                    <div className={cls.AllLinksBlock}>
                        <div className={cls.allLinksHeader}>
                            <Button onClick={() => dispatchAsync(req_getAllUserslinks())} >Все мои ссылки</Button>
                        </div>
                        <div className={cls.linksContainer}>
                            {allUsersLinks.map((link) => {
                                return <Link
                                    href={'http://localhost:4000/' + link.alias}
                                    className={cls.linkItem}>{'http://localhost:4000/' + link.alias}
                                </Link>
                            })}
                        </div>
                    </div>
                    : ''
                }


            </div>

        </div>
    );
};