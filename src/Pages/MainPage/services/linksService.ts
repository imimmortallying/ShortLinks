import { AxiosResponse } from "axios";
import $api from "../../../http";

export const linksService = {
    async sendLinkAuth(link: string): Promise<AxiosResponse> {
        try {
            const response = await $api.post('/sendLink', { authOrAnon:'auth', link});
            return response
        } catch (e) {
            console.log(e.response?.data)
        }

    },
}
