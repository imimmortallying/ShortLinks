import { create } from "zustand";

interface IUserState {
    username: string,
    status: 'anon' | 'signedin',

    updateUsername: (username:string) => void,
    updateUserStatus: (status: 'anon' | 'signedin') => void,
    setDefaultUserState: () => void,
}

export const useUserStore = create<IUserState>((set)=>({
    username: null,
    status: 'anon',

    updateUsername: (username) => set(() => ({ username: username })),
    updateUserStatus: (status) => set(() => ({ status: status })),

    setDefaultUserState:()=> set(() => ({ status: 'anon', username: null})),
}))