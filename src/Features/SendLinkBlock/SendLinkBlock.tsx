import { classNames } from "shared/lib/classNames/classNames";

import cls from "./SendLinkBlock.module.scss"
import { Button, Input } from "antd";
import { useState } from "react";
import { linksService } from "Pages/MainPage/services/linksService";
import { useSelector } from "react-redux";
import { selectUsername } from "Features/auth/authSlice";

interface SendLinkBlockProps {
    className?: string;
}

export const SendLinkBlock = ({ className }: SendLinkBlockProps) => {

    // если в редаксе юзернейм пустой, то request с fingerprint безх использования перехватчика axios
    // если есть пользователь, то с токеном из хранилища с использованием перехватчика axios
    // запрос должен иметь поле authOrAnon === 'auth' || 'anon', чтобы сервер определил с какой коллекцией работать

    const [link, setLink] = useState('');
    const onLinkChange = (e: any) => {
        setLink(e.target.value)
    }

    const authUsername = useSelector(selectUsername);

    return (

        <div className={classNames(cls.SendLinkBlock, {}, [className])}>

            <Input onChange={onLinkChange}></Input>
            {/* <div>
                {authUsername
                    ? <Button onClick={() => AuthService.loadLinks()}>Ссылки</Button>
                    : ''}
            </div> */}
            <Button onClick={
                // авторизован? соответствующие request
                authUsername 
                    ? () => linksService.sendLinkAuth(link)
                    : () => linksService.sendLinkAnon(link)
            }
            >
                Сократить
            </Button>
        </div>
    );
};