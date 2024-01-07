import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../../../shared/api/axios.api";
import FingerprintJS from '@fingerprintjs/fingerprintjs';


export const linksService = {
    async sendLinkAuth(link: string): Promise<AxiosResponse> {
        try {
            const response = await $api.post('/sendLink', { authOrAnon: 'auth', link });
            return response
        } catch (e) {
            console.log(e.response?.data)
        }

    },
    async sendLinkAnon(link: string): Promise<AxiosResponse> {
        try {

            //fingerprint init
            const fpPromise = FingerprintJS.load();

            const fingerprint = async () => {
                // Get the visitor identifier when you need it.
                const fp = await fpPromise;
                const result = await fp.get();
                console.log(result.visitorId)
                return result.visitorId
            }
            const response = await axios.post(`${API_URL}/sendLink`, { authOrAnon: 'anon', link, fingerprint: await fingerprint() }, { withCredentials: true });
            return response.data
        } catch (e) {
            console.log(e.response?.data)
        }
    },
    async findLinkByAlias(alias:string): Promise<{foundLink:string}> {
        try {
            const response = await axios.post(`http://localhost:5000/redirect`, {alias:alias});
            return response.data;
        } catch (e) {
            console.log(e.response?.data)
        }
    }
}
