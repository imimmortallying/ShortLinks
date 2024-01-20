import cls from "./SendLinkBlock.module.scss";
import { Button, Checkbox, Input, InputNumber, Typography } from "antd";
import { useState } from "react";

import { useSendLink } from "shared";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";
import { useAliasStore } from "Pages/MainPage/zustandStore/alias.store";

export const SendLinkBlock = () => {
  // antd
  const { Text } = Typography;
  
  //zustand
  const selectUsername = useUserStore((state) => state.username);
  const selectUserStatus = useUserStore((state) => state.status);
  const updateAlias = useAliasStore((state) => state.updateAlias);

  //localstate
  const [link, setLink] = useState("");
  const onLinkChange = (e: any) => {
    setLink(e.target.value);
  };

  const [TTLinput, setTTLinput] = useState(30);
  const onTTLinputChange = (value: any) => {
    setTTLinput(value);
  };

  const [TTLinputState, setTTLinputState] = useState(false);
  const onTTLinputStateChange = () => {
    setTTLinputState(!TTLinputState);
  };

  //query
  const sendLink = useSendLink();

  return (
    <div className={cls.SendLinkBlock}>
      <div className={cls.SendLinkHeader}>
        <Input onChange={onLinkChange} placeholder="вставьте ссылку"></Input>
        <Button
          onClick={() => {
            sendLink.mutate(
              { link: link, status: selectUserStatus, user: selectUsername, TTL: TTLinputState ? 'permanent' : TTLinput },
              {
                onSuccess: (data) => {
                  updateAlias(data.alias);
                },
              }
            );
          }}
        >
          Сократить
        </Button>
      </div>
      {selectUserStatus === 'signedin' &&
      <div className={cls.SendLinkTTL}>
        <Text className={cls.TTLtext}>Укажите срок жизни ссылки, дн. : </Text>
        <InputNumber
          className={cls.TTLinput}
          disabled={TTLinputState}
          onChange={onTTLinputChange}
          defaultValue={30}
          placeholder="укажите срок жизни ссылки"
          min={1}
          max={30}
        ></InputNumber>
        <Text className={cls.TTLtext}>Или пусть живет бессрочно : </Text>
        <Checkbox onClick={onTTLinputStateChange}></Checkbox>
      </div>
      }
      
    </div>
  );
};
