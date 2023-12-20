import { classNames } from "shared/lib/classNames/classNames";

import cls from "./RedirectPage.module.scss"
import { useParams } from "react-router-dom";
import { linksService } from "Pages/MainPage/services/linksService";
import { useEffect, useState } from "react";

interface RedirectPageProps {
    className?: string;
}

export const RedirectPage = ({ className }: RedirectPageProps) => {

    // const [originalLink, setOriginalLink] = useState('');
    let { linkAlias } = useParams();

    useEffect(() => {
        linksService.findLinkByAlias(linkAlias)
            .then((link)=>link.foundLink)
            .then((originalLink)=>window.location.replace(originalLink));
        ;
    }, [])



    // параметр отправить в бд
    // если нашелся, то редирект
    // если не нашелся, то вывести 'нет такой ссылки'
    return (
        <div className={classNames(cls.RedirectPage, {}, [className])}>
            {/* {`redirect from ${linkAlias} to ${originalLink}`} */}
        </div>
    );
};