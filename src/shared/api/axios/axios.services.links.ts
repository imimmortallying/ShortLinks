
import { $linkApi } from "./axios.link.api";

interface ISendLink {
  link: string;
  status: "anon" | "signedin";
  user: string;
  TTL?: number | "permanent";
}

interface IGetNewestLink {
  status: "anon" | "signedin";
  user: string;
}

export const linksService = {
  async findLinkByAlias(alias: string): Promise<{ foundLink: string }> {
    try {
      const response = await $linkApi.post(`/redirect`, { alias: alias });
      console.log("response:", response);
      return response.data;
    } catch (e) {
      throw (e)
    }
  },

  // localStorage.setItem('accessToken', response.data.accessToken);

  // async sendLink(link: string, status: 'anon' | 'signedin', user: string): Promise<{alias:string}> {
  async sendLink(cmd: ISendLink): Promise<{ alias: string }> {
    try {
      const response = await $linkApi.post("/sendLink", {
        user: cmd.user,
        link: cmd.link,
        status: cmd.status,
        TTL: cmd.TTL,
      });
      return response.data;
    } catch (e) {
      throw (e)
    }
  },

  async getNewestLink(cmd: IGetNewestLink): Promise<{ alias: string }> {
    try {
      const response = await $linkApi.post("/findNewestLink", {
        user: cmd.user,
        status: cmd.status,
      });
      console.log("RESP", response);
      return response.data;
    } catch (e) {
      throw (e)
    }
  },

  async getAllLinks(): Promise<{alias: string, clicksCount: number}[]> {
    try {
      const response = await $linkApi.post("/allUsersLinks", {
        status: "signedin",
      });
      return response.data.links;
    } catch (e) {
      throw (e)
    }
  },
};
