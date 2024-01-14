import cls from "./MainPage.module.scss";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "antd";

import { SendLinkBlock, selectAlias } from "widgets/SendLink";
import { ModalWindow } from "widgets/ModalWindow";
import { useSignout, useSignInQuery, useGetAllLinksMutation } from "shared";

import { selectAllUsersLinks } from "./models/allUsersLinksSlice";
import { useFingerprint } from "shared/lib/fingerprint/fingerprint";
import { MainPageProvider } from "./MainPage.context";
import { useUserFormState } from "./hooks/useUserFormState";

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

  //!finger
  const fingerprint = useFingerprint();
  console.log(fingerprint);
  
  const { Text, Link } = Typography;

  // query

  const signout = useSignout();

  const loadAllLinksMutation = useGetAllLinksMutation();

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
            {signIn.data?.alias === undefined
              ? ''
              : <Link className={cls.ResultLink} href={"http://localhost:4000/" + signIn.data?.alias}>
              { "http://localhost:4000/" + signIn.data?.alias}
            </Link>
              
            }
            
          </div>

          {signIn.status === "success" ? (
            <div className={cls.AllLinksBlock}>
              <div className={cls.allLinksHeader}>
                <Button onClick={() => loadAllLinksMutation.mutate()}>Все мои ссылки</Button>
              </div>
              <div className={cls.linksContainer}>
                {loadAllLinksMutation.isSuccess &&
                  signIn.data?.links.map((link) => {
                    return (
                      <Link
                        key={link}
                        href={"http://localhost:4000/" + link}
                        className={cls.linkItem}
                      >
                        {"http://localhost:4000/" + link}
                      </Link>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </MainPageProvider>
  );
};
