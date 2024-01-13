

import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthService } from "../axios/axios.services.auth";
import { QUERY_KEY} from "shared";
import { linksService } from "../axios/axios.services.links"


export function useSendLink(link:string) {
    const queryClient = useQueryClient();

    // query вернет либо undefined, либо строку.
    // я же говорю TS, что значения обязательно будут строками. Как правильно обработать эту ситуацию?
    const user = queryClient.getQueryData([QUERY_KEY.user]) as string
    const status = queryClient.getQueryData([QUERY_KEY.status]) as "anon" | "signedin"

    const { mutate: sendLinkMutation } = useMutation({
        mutationFn: () => linksService.sendLink({user:user, link:link, status:status}),
        onSuccess: (data) => {

            const alias = data?.alias;
            queryClient.setQueryData([QUERY_KEY.alias], alias);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY.links]});
        },
        onError: () => console.log('error in refresh query'),

    })
    
    
    return sendLinkMutation
}

export const useLoadAllLinksQuery = () => {

    return useQuery({
        queryFn: () => linksService.getAllLinks(),
        queryKey: [QUERY_KEY.links],
        enabled: false
    })
}



export function useGetAllLinks() {
    const queryClient = useQueryClient();

    const user = queryClient.getQueryData([QUERY_KEY.user]) as string
    const status = queryClient.getQueryData([QUERY_KEY.status]) as "anon" | "signedin"

    // все-таки сейчас это мутация т.к. я сохраняю полученную ссылку, чтобы вывести в компоненте
    const { mutate: sendLinkMutation } = useMutation({
        mutationFn: () => linksService.getAllLinks(),
        onSuccess: (data) => {

            const links = data;
            queryClient.setQueryData([QUERY_KEY.links], links)
        },
        onError: () => console.log('error in allLinks query'),

    })
    
    
    return sendLinkMutation
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
                queryClient.setQueryData([QUERY_KEY.status], 'anon');
            }
            queryClient.setQueryData([QUERY_KEY.status], 'signedin');
         },
        onError: () => console.log('error in refresh query'),

    })
    
    
    return refreshMutation
}

export function useSignout() {
    const queryClient = useQueryClient();
    const { mutate: signoutMutation } = useMutation({
        
        mutationFn: () => AuthService.logout(),
        onError: () => console.log('error in logout query'),
        onSuccess: () => { 

            queryClient.removeQueries();
         },
        // mutationKey: [QUERY_KEY.user],
    })
    
    
    return signoutMutation
}



export function useSignIn(username:string, password:string) {
    const queryClient = useQueryClient();
    const { mutate: signInMutation } = useMutation({
        mutationFn: () => AuthService.signin(username, password),

        onSuccess: (data) => { 
            const username = data?.data.user.username;
            queryClient.setQueryData([QUERY_KEY.user], username);

            // мб можно связать status и username через useEffect? там же, где буду делать первоначальный запрос при загрузке приложения
            if (data.data.user === undefined) {
                queryClient.setQueryData([QUERY_KEY.status], 'anon');
            }
            queryClient.setQueryData([QUERY_KEY.status], 'signedin');
         },

        onError: () => {
            queryClient.setQueryData([QUERY_KEY.status], 'anon');
            console.log('error in useSignIn query');
        },
    })
      
  
    return signInMutation
  }