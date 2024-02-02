

import cls from "./RedirectPage.module.scss"
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { classNames, linksService } from "shared";

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
    }, [])

    return (
        <div className={classNames(cls.RedirectPage, {}, [className])}>
        </div>
    );
};