import { useMainPageContext } from "Pages/MainPage/MainPage.context";
import cls from "./SendLinkBlock.module.scss";
import { Button, Input } from "antd";
import { useState } from "react";

import { useGetNewestLinkQuery, useRefresh, useSendLink } from "shared";

export const SendLinkBlock = () => {
  const [link, setLink] = useState("");
  const onLinkChange = (e: any) => {
    setLink(e.target.value);
  };

  const ctx = useMainPageContext();
  //query

  const checkAuth = useRefresh();
  const sendLink = useSendLink(link, checkAuth.data.username, checkAuth.data.userType);
  const getNewestLink = useGetNewestLinkQuery(checkAuth.data.username, checkAuth.data.userType);

  

  return (
    <div className={cls.SendLinkBlock}>
      <Input onChange={onLinkChange}></Input>

      <Button
        onClick={() => {

          sendLink.mutate(undefined, {
            onSuccess: () => {
              getNewestLink.enableQuery();
            }
            
          });
          if (getNewestLink.isSuccess) getNewestLink.disableQuery()
        }}
      >
        Сократить
      </Button>
    </div>
  );
};
