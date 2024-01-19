import { create } from "zustand";

interface IAliasState {
    alias: string,

    updateAlias: (alias:string) => void,
}

export const useAliasStore = create<IAliasState>((set)=>({
    alias: null,

    updateAlias: (alias) => set(() => ({ alias: alias })),
}))