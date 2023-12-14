import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../Models/response/AuthResponse";

export default class UserService {
    static fetchLinks(): Promise<AuthResponse> {
        return $api.get('/links')
    }
}