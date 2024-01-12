

import { useMutation, useQueryClient } from "react-query";
import { AuthService } from "../axios/axios.services.auth";
import { QUERY_KEY} from "shared";
import { linksService } from "../axios/axios.services.links"


export function useSendLink(link:string) {
    const queryClient = useQueryClient();

    // query вернет либо undefined, либо строку.
    // я же говорю TS, что значения обязательно будут строками. Как правильно обработать эту ситуацию?
    const user = queryClient.getQueryData([QUERY_KEY.user]) as string
    const status = queryClient.getQueryData([QUERY_KEY.status]) as "anon" | "signedin"
    
    // в чем разница между мутацией и не мутацией?
    // если я хочу просто получить ссылку в ответ и никак не воздействовать на query State, то нужна ли мне мутация
    // а если я все равно ее использую, то что?

    // все-таки сейчас это мутация т.к. я сохраняю полученную ссылку, чтобы вывести в компоненте
    const { mutate: sendLinkMutation } = useMutation({
        mutationFn: () => linksService.sendLink({user:user, link:link, status:status}),
        onSuccess: (data) => {

            const alias = data?.alias;
            queryClient.setQueryData([QUERY_KEY.alias], alias)
        },
        onError: () => console.log('error in refresh query'),

    })
    
    
    return sendLinkMutation
}

export function useRefresh() {
    
    const { mutate: refreshMutation } = useMutation({
        mutationFn: () => AuthService.refresh(),

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
            queryClient.setQueryData([QUERY_KEY.status], 'signedin');
         },
        onError: () => console.log('error in useSignIn query'),
        // mutationKey: [QUERY_KEY.user, username], // зачем они мне вообще?
        
    })
      
  
    return signInMutation
  }