import cls from "./MainPage.module.scss";

import { FC, useState } from "react";
import { Button, Typography } from "antd";

import { SendLinkBlock } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import { useSignout, useSignInQuery, useGetAllLinksQuery, useGetNewestLinkQuery, useRefresh } from "shared";

import { useFingerprint } from "shared/lib/fingerprint/fingerprint";
import { MainPageProvider, useMainPageContext } from "./MainPage.context";
import { useUserFormState } from "./hooks/useUserFormState";
import { AllLinksList } from "Features/AllLinksList/ui/AllLinksList";

interface MainPageProps {
  className?: string;
  // children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = () => {
  //modal state and handlers
  const [isOpened, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [isVisible, setVisible] = useState(false);
  const showAllLinks = () => {
    setVisible(true);
  };

  //!finger
  const fingerprint = useFingerprint();
  console.log(fingerprint);

  const { Text, Link } = Typography;


  const ctx = useMainPageContext();
  // query

  
  const signout = useSignout();
  // const sendLink = useSendLink(link);
  const userFormState = useUserFormState();
  
  const signIn = useSignInQuery(userFormState.username, userFormState.password);
  const checkAuth = useRefresh();
  // console.log('CTX',checkAuth)

  const getNewestLink = useGetNewestLinkQuery(checkAuth.data.username, checkAuth.data.userType);
  
  const loadAllLinksQuery = useGetAllLinksQuery();

  
  // const checkAuth = useRefresh();

  return (
    // <MainPageProvider value={{ user: signIn }}>
    <MainPageProvider value={{ user: checkAuth }}>
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

            {signIn.status === "success" ? (
              <Button onClick={() => signout()} block>
                Выйти
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={cls.Body}>
          <SendLinkBlock />

          <div className={cls.ResultBlock}>
            <Text className={cls.ResultText}>Результат:</Text>
            {getNewestLink.data === undefined ? ( //!
              ""
            ) : (
              <Link
                className={cls.ResultLink}
                href={"http://localhost:4000/" + getNewestLink.data?.alias}
              >
                {"http://localhost:4000/" + getNewestLink.data?.alias}
              </Link>
            )}
          </div>

          {signIn.status === "success" ? (
            <div className={cls.AllLinksBlock}>
              <div className={cls.allLinksHeader}>
                <Button onClick={() => {showAllLinks(), loadAllLinksQuery.enableQuery()}}>Все мои ссылки</Button>
              </div>
              {isVisible && <AllLinksList />}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </MainPageProvider>
  );
};
