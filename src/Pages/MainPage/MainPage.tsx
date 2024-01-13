
import cls from "./MainPage.module.scss";

import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "antd";

import { SendLinkBlock, selectAlias, selectUsername } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import { QUERY_KEY, linksService, useLoadAllLinksQuery, useAppDispatch, useSignout } from "shared";

import { selectAllUsersLinks } from "./models/allUsersLinksSlice";
import { req_getAllUserslinks } from "./api/req_getAllUsersLinks";
import { useQuery, useQueryClient } from "react-query";
import { useFingerprint } from "shared/lib/fingerprint/fingerprint";


interface MainPageProps {
    className?: string;
    // children?: ReactNode;
}


export const MainPage: FC<MainPageProps> = () => {




    //modal state and handlers
    const [isOpened, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    //!finger
    const fingerprint = useFingerprint();
    Promise.resolve(fingerprint()).then(val=>console.log(val))

    // query
    
    const signout = useSignout();

    const aliasRes = useSelector(selectAlias);
    const allUsersLinks = useSelector(selectAllUsersLinks);

    const { Text, Link } = Typography;
    const { data, isSuccess, refetch: loadAllLinks } = useLoadAllLinksQuery();

    const queryClient = useQueryClient()
    const userData = queryClient.getQueryData([QUERY_KEY.user]);
    const userStatus = queryClient.getQueryData([QUERY_KEY.status]);
    const newAlias = queryClient.getQueryData([QUERY_KEY.alias]) as string;

    useEffect(() => {

    }, [newAlias]);

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
                    <Link className={cls.ResultLink} href={aliasRes}>{newAlias}</Link>
                </div>

                {userData
                    ?
                    <div className={cls.AllLinksBlock}>
                        <div className={cls.allLinksHeader}>
                            <Button onClick={() => loadAllLinks()} >Все мои ссылки</Button>
                        </div>
                        <div className={cls.linksContainer}>
                            {isSuccess && data.map((link) => {
                                return <Link
                                    key={link}
                                    href={'http://localhost:4000/' + link}
                                    className={cls.linkItem}>{'http://localhost:4000/' + link}
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