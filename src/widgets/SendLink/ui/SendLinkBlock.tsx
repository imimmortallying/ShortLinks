import { classNames } from "shared/lib/classNames/classNames";

import cls from "./SendLinkBlock.module.scss"
import { Button, Input } from "antd";
import { useState } from "react";

import { useAppDispatch } from "App/hooks/hooks";
import { useSelector } from "react-redux";

import { selectUsername } from "../models/authSlice";
import { req_SendAuthLink } from "../api/req_sendAuthLink";
import { req_SendAnonLink } from "../api/req_sendAnonLink";


interface SendLinkBlockProps {
    className?: string;
}

export const SendLinkBlock = ({ className }: SendLinkBlockProps) => {

    // если в редаксе юзернейм пустой, то request с fingerprint безх использования перехватчика axios
    // если есть пользователь, то с токеном из хранилища с использованием перехватчика axios
    // запрос должен иметь поле authOrAnon === 'auth' || 'anon', чтобы сервер определил с какой коллекцией работать

    const dispatchAsync = useAppDispatch();

    const [link, setLink] = useState('');
    const onLinkChange = (e: any) => {
        setLink(e.target.value)
    }

    const authUsername = useSelector(selectUsername);

    return (

        <div className={classNames(cls.SendLinkBlock, {}, [className])}>

            <Input onChange={onLinkChange}></Input>

            <Button onClick={
                // авторизован? соответствующие request
                authUsername 
                    ? () => dispatchAsync(req_SendAuthLink({link:link}))
                    : () => dispatchAsync(req_SendAnonLink({link:link}))
            }
            >
                Сократить
            </Button>
        </div>
    );
};