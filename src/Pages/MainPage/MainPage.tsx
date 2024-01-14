import cls from "./MainPage.module.scss";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "antd";

import { SendLinkBlock, selectAlias } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import { useSignout, useSignInQuery, useGetAllLinksQuery } from "shared";

import { selectAllUsersLinks } from "./models/allUsersLinksSlice";
import { useFingerprint } from "shared/lib/fingerprint/fingerprint";
import { MainPageProvider } from "./MainPage.context";
import { useUserFormState } from "./hooks/useUserFormState";
import { AllLinksList } from "Features/AllLinksList/ui/allLinksList";

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

  // query

  const signout = useSignout();

  const userFormState = useUserFormState();

  const signIn = useSignInQuery(userFormState.username, userFormState.password);

  return (
    <MainPageProvider value={{ user: signIn }}>
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
            {signIn.data?.alias === undefined ? (
              ""
            ) : (
              <Link
                className={cls.ResultLink}
                href={"http://localhost:4000/" + signIn.data?.alias}
              >
                {"http://localhost:4000/" + signIn.data?.alias}
              </Link>
            )}
          </div>

          {signIn.status === "success" ? (
            <div className={cls.AllLinksBlock}>
              <div className={cls.allLinksHeader}>
                <Button onClick={showAllLinks}>Все мои ссылки</Button>
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
