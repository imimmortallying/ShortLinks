import cls from "./SendLinkBlock.module.scss";
import { Button, Input } from "antd";
import { useState } from "react";

import { useGetNewestLinkQuery, useSendLink } from "shared";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";
import { useAliasStore } from "Pages/MainPage/zustandStore/alias.store";

export const SendLinkBlock = () => {

  //zustand
  const selectUsername = useUserStore((state) => state.username);
  const selectUserStatus = useUserStore((state) => state.status);

  const updateAlias = useAliasStore((state) => state.updateAlias);

  const [link, setLink] = useState("");
  const onLinkChange = (e: any) => {
    setLink(e.target.value);
  };

  //query

  // const checkAuth = useRefresh();
  const sendLink = useSendLink();
  const getNewestLink = useGetNewestLinkQuery(selectUsername, selectUserStatus);

  

  return (
    <div className={cls.SendLinkBlock}>
      <Input onChange={onLinkChange}></Input>

      <Button
        onClick={() => {


          // sendLink.mutate({link:link, status: selectUserStatus, user: selectUsername})


          sendLink.mutate({link:link, status: selectUserStatus, user: selectUsername}, {
            onSuccess:(data)=> {
              // getNewestLink.enableQuery()
              updateAlias(data.alias)
            }
          })  
          }}
      >
        Сократить
      </Button>
    </div>
  );
};
