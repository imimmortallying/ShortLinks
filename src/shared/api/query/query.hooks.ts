import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService, signInResponse } from "../axios/axios.services.auth";
import { QUERY_KEY } from "shared";
import { linksService } from "../axios/axios.services.links";
import { useState } from "react";
import { useFingerprint } from "shared/lib/fingerprint/fingerprint";

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

// export type UseSignInQuerySelectData = ReturnType<typeof useSignInQuery>;
// export type UseRefreshData = ReturnType<typeof useRefresh>;
// export type UseSignInQueryCacheData = AxiosResponse<signInResponse>;

export function useSignInMutation(username: string, password: string) {

  const signInMutation = useMutation({
    mutationFn: () => AuthService.signin(username, password),
    // throwOnError: true,
  });
  return { ...signInMutation };
}

export function useSignUpMutation(username: string, password: string) {
  const signUpMutation = useMutation({
    mutationFn: () => AuthService.signup(username, password),
    throwOnError: true,
  }
  
  );
  return { ...signUpMutation };
}

export function useRefreshMutation() {

  const refreshMutation = useMutation({

    mutationFn: () => AuthService.refresh(),

  });

  return { ...refreshMutation };
}



// передать юзера из модалки передать через контекст
export function useSendLink(

) {
  const queryClient = useQueryClient();
  const userFinger = useFingerprint();
  
  const sendLinkMutation = useMutation({
    mutationFn: ({link, user, status, TTL} : {link: string, user?: string, status?: "anon" | "signedin", TTL?: number | 'permanent'}) =>
      linksService.sendLink({
        link: link,
        user: user ? user : userFinger,
        status: status ? status : 'anon',
        TTL: TTL
      }),
    onSuccess: (data) => {
      console.log('ALIAS:', data)
      // queryClient.setQueryData([QUERY_KEY.alias])
      // queryClient.invalidateQueries([QUERY_KEY.links])
    },

    onError: () => console.log("error in send link"),
  });

  return {...sendLinkMutation};
}

export function useGetAllLinksQuery() {
  const [enabled, setEnabled] = useState(false);
  const enableQuery = () => {
    setEnabled(true);
  };

  const getAllLinksQuery = useQuery({
    queryFn: () => linksService.getAllLinks(),
    enabled,
    queryKey: [QUERY_KEY.links],
  });

  return { ...getAllLinksQuery, enableQuery };
}
