import { classNames } from "shared/lib/classNames/classNames";

import cls from "./MainPage.module.scss";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "antd";

import { SendLinkBlock, selectAlias, selectUsername } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";

import { selectAllUsersLinks } from "./models/allUsersLinksSlice";
import { req_getAllUserslinks } from "./api/req_getAllUsersLinks";
import { req_MainPagelogout } from "./api/req_MainPageLogout";
import { useAppDispatch } from "shared";


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