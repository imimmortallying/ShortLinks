import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthService, signInResponse } from "../axios/axios.services.auth";
import { QUERY_KEY } from "shared";
import { linksService } from "../axios/axios.services.links";
import { useState } from "react";
import { useMainPageContext } from "Pages/MainPage/MainPage.context";
import { AxiosResponse } from "axios";



export const useLoadAllLinksQuery = () => {
  return useQuery({
    queryFn: () => linksService.getAllLinks(),
    queryKey: [QUERY_KEY.links],
    enabled: false,
  });
};




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

  const signInQuery = useQuery({
    queryKey: [QUERY_KEY.user],
    enabled,
    staleTime: Infinity,
    queryFn: () => AuthService.signin(username, password),
    select: ({ data }) => ({
      username: data?.user.username,
      alias: data?.user.alias,
      links: data?.user.links,
      userType:
        data?.user === undefined ? ("anon" as const) : ("signedin" as const),
    }), //todo лучше вынести в отдельную ф-ю
  });

  return { ...signInQuery, setEnabled };
}

export function useRefresh() {

  const refreshQuery = useQuery({
    queryKey: [QUERY_KEY.user],
    enabled: false,
    staleTime: Infinity,
    queryFn: () => AuthService.refresh(),
    select: ({ data }) => ({
      username: data?.user.username,
      alias: data?.user.alias,
      userType:
        data?.user === undefined ? ("anon" as const) : ("signedin" as const),
    }), //todo лучше вынести в отдельную ф-ю
  });

  return refreshQuery;
}

// передать юзера из модалки передать через контекст
export function useSendLink(link: string) {
  const queryClient = useQueryClient();

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
          // console.log("PREV", prev);

          const updatedUser = {
            ...prev.data.user,
            alias,
            links: [...prev.data.user.links, alias] // как правильно обновить локальный стейт ссылок при отправке новой ссылки?
            // добавить вручную, но нужно разобраться с TS. Либо через invalidateQueries, но как?
          }

          return {
            ...prev,
            data: { ...prev.data, user: updatedUser },
          };
        }
      );
      queryClient.invalidateQueries([QUERY_KEY.user]); // если я создаю отдельный стейт по другому ключу, то работало. Но как обновить стейт
      // который находится внутри более комплексной сущности user: {username, alias, links}

      // складывается ощущение, что стейт должен быть продуман заранее и вынесен в TS модели
    },
    onError: () => console.log("error in refresh query"),
  });

  return sendLinkMutation;
}


export function useGetAllLinksMutation() {
  const queryClient = useQueryClient();

  // все-таки сейчас это мутация т.к. я сохраняю полученную ссылку, чтобы вывести в компоненте
  const  getAllLinksMutation = useMutation({
    mutationFn: () => linksService.getAllLinks(),
    onSuccess: (data) => {
      const links = data;
      queryClient.setQueryData<UseSignInQueryCacheData>(
        [QUERY_KEY.user],
        (prev) => {
          // console.log("PREV", prev);
          return {
            ...prev,
            data: { ...prev.data, user: { ...prev.data.user, links } },
          };
        }
      );
    },
    onError: () => console.log("error in allLinks query"),
  });

  return getAllLinksMutation;
}