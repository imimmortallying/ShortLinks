import { classNames } from "shared/lib/classNames/classNames";

import cls from "./AllLinksList.module.scss"
import { useGetAllLinksQuery } from "shared";
import { Typography } from "antd";
const { Text, Link } = Typography;


interface AllLinksListProps {
    className?: string;
}
export const AllLinksList = ({className}:AllLinksListProps) => {
    
    const loadAllLinksQuery = useGetAllLinksQuery();

    return (
        <div className={cls.linksContainer}>
        {loadAllLinksQuery.isSuccess && 
          loadAllLinksQuery.data?.map((link) => {
            return (
              <Link
                key={link}
                href={"http://localhost:4000/" + link}
                className={cls.linkItem}
              >
                {"http://localhost:4000/" + link}
              </Link>
            );
          })}
      </div>
    );
};