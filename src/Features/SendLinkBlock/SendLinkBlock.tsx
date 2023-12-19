import { classNames } from "shared/lib/classNames/classNames";

import cls from "./SendLinkBlock.module.scss"
import { Button, Input } from "antd";

interface SendLinkBlockProps {
    className?: string;
}

export const SendLinkBlock = ({className}:SendLinkBlockProps) => {
    return (
        <div className={classNames(cls.SendLinkBlock, {}, [className])}>
            <Input></Input>
            <Button>Сократить</Button>
        </div>
    );
};