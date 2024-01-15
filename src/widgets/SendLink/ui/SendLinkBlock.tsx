import cls from "./SendLinkBlock.module.scss";
import { Button, Input } from "antd";
import { useState } from "react";

import { useGetNewestLinkQuery, useSendLink } from "shared";

export const SendLinkBlock = () => {
  const [link, setLink] = useState("");
  const onLinkChange = (e: any) => {
    setLink(e.target.value);
  };

  //query
  const sendLink = useSendLink(link);
  const getNewestLink = useGetNewestLinkQuery();

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
