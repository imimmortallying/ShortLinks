import cls from "./AllLinksList.module.scss";
import { useGetAllLinksQuery } from "shared";
import { Typography } from "antd";
const { Text, Link } = Typography;

interface AllLinksListProps {}
export const AllLinksList = () => {
  const loadAllLinksQuery = useGetAllLinksQuery();

  return (
    <div className={cls.linksContainer}>
      {loadAllLinksQuery.isSuccess &&
        loadAllLinksQuery.data?.map((linkObj) => {
          return (
            <div className={cls.linkWithCount} key={linkObj.alias}>
              <Link
                href={"http://localhost:4000/" + linkObj.alias}
                className={cls.linkItem}
              >
                {"http://localhost:4000/" + linkObj.alias}
              </Link>
              <Text>{linkObj.clicksCount}</Text>
            </div>
          );
        })}
    </div>
  );
};
