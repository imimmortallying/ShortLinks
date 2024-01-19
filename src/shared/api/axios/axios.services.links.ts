import axios from "axios";
import { $api } from "./axios.auth.api";
import { $linkApi } from "./axios.link.api";

interface ISendLink {
    link: string, 
    status: 'anon' | 'signedin', 
    user: string
}

interface IGetNewestLink {
    status: 'anon' | 'signedin', 
    user: string
}

export const linksService = {
    async findLinkByAlias(alias:string): Promise<{foundLink:string}> {
        try {
            const response = await $linkApi.post(`/redirect`, {alias:alias});
            console.log('response:', response)
            return response.data;
        } catch (e) {
            console.log(e.response?.data)
        }
    },

    // localStorage.setItem('accessToken', response.data.accessToken);

    // async sendLink(link: string, status: 'anon' | 'signedin', user: string): Promise<{alias:string}> {
    async sendLink(cmd:ISendLink): Promise<{alias:string}> {
        try {

            const response = await $linkApi.post('/sendLink', { user:cmd.user, link:cmd.link, status: cmd.status});
            return response.data
        } catch (e) {
            console.log('sendLink axios error')
            return e
        }

    },

    
    async getNewestLink(cmd:IGetNewestLink): Promise<{alias:string}>{
        try{
            const response = await $linkApi.post('/findNewestLink', {user:cmd.user, status: cmd.status});
            console.log('RESP', response)
            return response.data
        } catch (e) {

        }
    },

    async getAllLinks(): Promise<string[]> {
        try {
            const response = await $linkApi.post('/allUsersLinks', {status: 'signedin'});
            return response.data.links
        } catch (e) {
            console.log(e.response?.data)
        }

    },
}
