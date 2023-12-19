import { classNames } from "shared/lib/classNames/classNames";

import cls from "./SendLinkBlock.module.scss"
import { Button, Input } from "antd";

interface SendLinkBlockProps {
    className?: string;
}

export const SendLinkBlock = ({className}:SendLinkBlockProps) => {

    // если в редаксе юзернейм пустой, то request с fingerprint безх использования перехватчика axios
    // если есть пользователь, то с токеном из хранилища с использованием перехватчика axios
    // запрос должен иметь поле authOrAnon === 'auth' || 'anon', чтобы сервер определил с какой коллекцией работать
    return (
        <div className={classNames(cls.SendLinkBlock, {}, [className])}>

            <Input></Input>
            <Button>Сократить</Button>
        </div>
    );
};