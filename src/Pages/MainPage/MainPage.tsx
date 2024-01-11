
import cls from "./MainPage.module.scss";

import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "antd";

import { SendLinkBlock, selectAlias, selectUsername } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import { QUERY_KEY, useAppDispatch, useSignout } from "shared";

import { selectAllUsersLinks } from "./models/allUsersLinksSlice";
import { req_getAllUserslinks } from "./api/req_getAllUsersLinks";
import { useQueryClient } from "react-query";


interface MainPageProps {
    className?: string;
    // children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = () => {



    // query hooks
    const signout = useSignout();

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

    // query
    const queryClient = useQueryClient()
    const userData = queryClient.getQueryData([QUERY_KEY.user])

    useEffect(() => {

        // if (!user) userLocalStorage.removeUser();
        // else userLocalStorage.saveUser(user);
        console.log('USER:', userData)
      }, [userData]);

    return (
        <div className={cls.MainPage}>
            <ModalWindow isOpened={isOpened} handleCloseModal={handleCloseModal}></ModalWindow>

            <div className={cls.Header}>

                <div className={cls.authButtonsBlock}>

                    <Button type="primary" onClick={showModal} block>
                        Вход/регистрация
                    </Button>

                    {userData
                        ? <Button onClick={() => signout()} block>Выйти</Button>
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

                {userData
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