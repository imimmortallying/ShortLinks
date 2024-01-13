import cls from "./SendLinkBlock.module.scss";
import { Button, Input } from "antd";
import { useState } from "react";

import { useSendLink } from "shared";

export const SendLinkBlock = () => {
  const [link, setLink] = useState("");
  const onLinkChange = (e: any) => {
    setLink(e.target.value);
  };

  //query
  const sendLink = useSendLink(link);

  return (
    <div className={cls.SendLinkBlock}>
      <Input onChange={onLinkChange}></Input>

      <Button onClick={() => sendLink.mutate()}>Сократить</Button>
    </div>
  );
};
