import cls from "./MainPage.module.scss";

import { FC, useState } from "react";
import { Button, Typography } from "antd";

import { SendLinkBlock } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import {
  useSignout,
  useSignInMutation,
  useGetAllLinksQuery,
  useGetNewestLinkQuery,
  useSendLink,
} from "shared";

import { useUserFormState } from "./hooks/useUserFormState";
import { AllLinksList } from "Features/AllLinksList/ui/AllLinksList";
import { useAliasStore } from "./zustandStore/alias.store";
import { useUserStore } from "widgets/ModalWindow/zustandStore/user.store";

interface MainPageProps {
  className?: string;
  // children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = () => {
  // zustand
  const selectAlias = useAliasStore((state) => state.alias);
  const userStatus = useUserStore((state) => state.status);
  // const updateAlias = useAliasStore((state) => state.updateAlias);

  //modal state and handlers
  const [isOpened, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [isVisible, setVisible] = useState(false);
  const showAllLinks = () => {
    setVisible(true);
  };

  const { Text, Link } = Typography;

  // query

  const signout = useSignout();
  const sendLink = useSendLink();
  const userFormState = useUserFormState();

  const signIn = useSignInMutation(
    userFormState.username,
    userFormState.password
  );
  console.log("SENDLINK:", sendLink.data);

  const getNewestLink = useGetNewestLinkQuery();

  const loadAllLinksQuery = useGetAllLinksQuery();

  // const checkAuth = useRefresh();

  return (
    // <MainPageProvider value={{ user: signIn }}>
    // <MainPageProvider value={{ user: checkAuth }}>
    <div className={cls.MainPage}>
      <ModalWindow
        userFormState={userFormState}
        isOpened={isOpened}
        handleCloseModal={handleCloseModal}
      ></ModalWindow>

      <div className={cls.Header}>
        <div className={cls.authButtonsBlock}>
          <Button type="primary" onClick={showModal} block>
            Вход/регистрация
          </Button>

          {userStatus === "signedin" && (
            <Button onClick={() => signout()} block>
              Выйти
            </Button>
          )}
        </div>
      </div>

      <div className={cls.Body}>
        <SendLinkBlock />

        <div className={cls.ResultBlock}>
          <Text className={cls.ResultText}>Результат:</Text>
          {selectAlias && (
            <Link
              className={cls.ResultLink}
              href={"http://localhost:4000/" + selectAlias}
            >
              {"http://localhost:4000/" + selectAlias}
            </Link>
          )}
        </div>
        {userStatus === "signedin" && (
          <div className={cls.AllLinksBlock}>
            <div className={cls.allLinksHeader}>
              <Button
                onClick={() => {
                  showAllLinks(), loadAllLinksQuery.enableQuery();
                }}
              >
                Все мои ссылки
              </Button>
            </div>
            {isVisible && <AllLinksList />}
          </div>
        )}
      </div>
    </div>
    // </MainPageProvider>
  );
};
