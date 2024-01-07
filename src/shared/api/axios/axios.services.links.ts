import axios from "axios";

export const linksService = {
    async findLinkByAlias(alias:string): Promise<{foundLink:string}> {
        try {
            const response = await axios.post(`http://localhost:5000/redirect`, {alias:alias});
            return response.data;
        } catch (e) {
            console.log(e.response?.data)
        }
    }
}
