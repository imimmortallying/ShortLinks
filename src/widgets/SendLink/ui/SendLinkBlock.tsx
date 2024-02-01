import cls from "./SendLinkBlock.module.scss";
import { Button, Checkbox, Input, InputNumber, Typography } from "antd";
import { useState } from "react";

import { useSendLink } from "shared";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";
import { useAliasStore } from "Pages/MainPage/zustandStore/alias.store";

import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from "axios";

export const SendLinkBlock = () => {

  //toaster
  const notify = (message: string) => toast(message);

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
      <Toaster />
      <div className={cls.SendLinkHeader}>
        <Input onChange={onLinkChange} placeholder="вставьте ссылку"></Input>
        <Button
          onClick={() => {
            sendLink.mutate(
              {
                link: link,
                status: selectUserStatus,
                user: selectUsername,
                TTL: TTLinputState && selectUserStatus === "signedin"? "permanent" : TTLinput,
                // костыль. TTL определяется всегда, даже если юзер === анон
                // т.е. если юзер анон, уйдет TTLinputState (30 дефолт). Но бэк не считает этот TTL,
                // потому что будет ориентироваться на статус, TTL просто проигнорируется
              },
              {
                onSuccess: (data) => {
                  updateAlias(data.alias);
                },
                onError:(error: Error)=>{
                  if (error instanceof AxiosError && error.code === 'ERR_NETWORK')
                  notify('Не удается сократить ссылку - нет соединения с сервером')
                }
              }
            );
          }}
        >
          Сократить
        </Button>
      </div>
      {selectUserStatus === "signedin" && (
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
      )}
    </div>
  );
};
