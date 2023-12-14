import { classNames } from "shared/lib/classNames/classNames";

import cls from "./SendLinkForm.module.scss"
import { Button, Input } from "antd";
import { useState } from "react";

interface SendLinkFormProps {
    className?: string;
}
// input + button
//todo отправить значение инпута в бд
export const SendLinkForm = ({className}:SendLinkFormProps) => {

    const [fulllink, setFulllink] = useState('')
    const onFulllinkChange = (e:any) => { //? типизировать e
        setFulllink(e.target.value)
    }

        //todo вспомнить как отправлять http request; как правильно называть методы
        const PostLink = (link:string) => {
            fetch('http://localhost:5000/users', { method: 'POST', headers:{"content-type":"application/json"}, body:JSON.stringify({name:link })})
        }

    return (
        <div className={classNames(cls.SendLinkForm, {}, [className])}>
            <Input
                onChange={onFulllinkChange}
            />

            <Button
                onClick={()=>PostLink(fulllink)}
            />
        </div>
    );
};