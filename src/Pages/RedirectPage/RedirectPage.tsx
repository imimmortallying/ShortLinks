import { classNames } from "shared/lib/classNames/classNames";

import cls from "./RedirectPage.module.scss"

interface RedirectPageProps {
    className?: string;
}

export const RedirectPage = ({className}:RedirectPageProps) => {
    return (
        <div className={classNames(cls.RedirectPage, {}, [className])}>
        redirect
        </div>
    );
};