import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthService, signInResponse } from "../axios/axios.services.auth";
import { QUERY_KEY } from "shared";
import { linksService } from "../axios/axios.services.links";
import { useState } from "react";
import { useMainPageContext } from "Pages/MainPage/MainPage.context";
import { AxiosResponse } from "axios";

// передать юзера из модалки передать через контекст
export function useSendLink(link: string) {
  const queryClient = useQueryClient();

  // query вернет либо undefined, либо строку.
  // я же говорю TS, что значения обязательно будут строками. Как правильно обработать эту ситуацию?
  // const user = queryClient.getQueryData([QUERY_KEY.user]) as string
  // const status = queryClient.getQueryData([QUERY_KEY.status]) as "anon" | "signedin"
  const ctx = useMainPageContext();
  const sendLinkMutation = useMutation({
    mutationFn: () =>
      linksService.sendLink({
        user: ctx.user.data.username,
        link: link,
        status: ctx.user.data.userType,
      }),
    onSuccess: (data) => {
      const alias = data?.alias;
      queryClient.setQueryData<UseSignInQueryCacheData>(
        [QUERY_KEY.user],
        (prev) => {
          console.log("PREV", prev, alias);
          return {
            ...prev,
            data: { ...prev.data, user: { ...prev.data.user, alias } },
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.links] });
    },
    onError: () => console.log("error in refresh query"),
  });

  return sendLinkMutation;
}

export const useLoadAllLinksQuery = () => {
  return useQuery({
    queryFn: () => linksService.getAllLinks(),
    queryKey: [QUERY_KEY.links],
    enabled: false,
  });
};

export function useGetAllLinks() {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData([QUERY_KEY.user]) as string;
  const status = queryClient.getQueryData([QUERY_KEY.status]) as
    | "anon"
    | "signedin";

  // все-таки сейчас это мутация т.к. я сохраняю полученную ссылку, чтобы вывести в компоненте
  const { mutate: sendLinkMutation } = useMutation({
    mutationFn: () => linksService.getAllLinks(),
    onSuccess: (data) => {
      const links = data;
      queryClient.setQueryData([QUERY_KEY.links], links);
    },
    onError: () => console.log("error in allLinks query"),
  });

  return sendLinkMutation;
}

export function useRefresh() {
  const queryClient = useQueryClient();

  const { mutate: refreshMutation } = useMutation({
    mutationFn: () => AuthService.refresh(),
    onSuccess: (data) => {
      const username = data?.data.user.username;
      queryClient.setQueryData([QUERY_KEY.user], username);

      // мб можно связать status и username через useEffect? там же, где буду делать первоначальный запрос при загрузке приложения
      if (data.data.user === undefined) {
        queryClient.setQueryData([QUERY_KEY.status], "anon");
      }
      queryClient.setQueryData([QUERY_KEY.status], "signedin");
    },
    onError: () => console.log("error in refresh query"),
  });

  return refreshMutation;
}

export function useSignout() {
  const queryClient = useQueryClient();
  const { mutate: signoutMutation } = useMutation({
    mutationFn: () => AuthService.logout(),
    onError: () => console.log("error in logout query"),
    onSuccess: () => {
      queryClient.removeQueries();
    },
    // mutationKey: [QUERY_KEY.user],
  });

  return signoutMutation;
}

export type UseSignInQuerySelectData = ReturnType<typeof useSignInQuery>;
export type UseSignInQueryCacheData = AxiosResponse<signInResponse>;

export function useSignInQuery(username: string, password: string) {
  const [enabled, setEnabled] = useState(false);

  const queryClient = useQueryClient();
  const signInQuery = useQuery({
    queryKey: [QUERY_KEY.user],
    enabled,
    staleTime: Infinity,
    queryFn: () => AuthService.signin(username, password),
    select: ({ data }) => ({
      username: data?.user.username,
      alias: data?.user.alias,
      userType:
        data?.user === undefined ? ("anon" as const) : ("signedin" as const),
    }), //todo лучше вынести в отдельную ф-ю
    // onSuccess: (data) => {
    //     const username = data?.data.user.username;
    //     queryClient.setQueryData([QUERY_KEY.user], username);

    //     // мб можно связать status и username через useEffect? там же, где буду делать первоначальный запрос при загрузке приложения
    //     if (data.data.user === undefined) {
    //         queryClient.setQueryData([QUERY_KEY.status], 'anon');
    //     }
    //     queryClient.setQueryData([QUERY_KEY.status], 'signedin');
    //  },
  });

  return { ...signInQuery, setEnabled };
}
