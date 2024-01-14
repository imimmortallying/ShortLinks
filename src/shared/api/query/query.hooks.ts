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
          }

          return {
            ...prev,
            data: { ...prev.data, user: updatedUser },
          };
        }
      );
      queryClient.invalidateQueries([QUERY_KEY.links]);
    },
    onError: () => console.log("error in send link"),
  });

  return sendLinkMutation;
}


export function useGetAllLinksQuery() {
  const queryClient = useQueryClient();

  // все-таки сейчас это мутация т.к. я сохраняю полученную ссылку, чтобы вывести в компоненте
  const  getAllLinksQuery = useQuery({
    queryFn: () => linksService.getAllLinks(),
    
    queryKey: [QUERY_KEY.links],

    // onSuccess: (data) => {
    //   const links = data;
    //   queryClient.setQueryData<UseSignInQueryCacheData>(
    //     [QUERY_KEY.user],
    //     (prev) => {
    //       // console.log("PREV", prev);
    //       return {
    //         ...prev,
    //         data: { ...prev.data, user: { ...prev.data.user, links } },
    //       };
    //     }
    //   );
    // },
    // onError: () => console.log("error in allLinks query"),
  });

  return getAllLinksQuery;
}