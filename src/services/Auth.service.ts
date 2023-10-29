import { instance } from "./config";

type Params = Record<string, any>;

export class AuthService {
  static baseUrl = "/auth/";

  static login(param: Params) {
    return instance.post(this.baseUrl + "signin", param.data);
  }

  static signup(param: Params) {
    return instance.post(this.baseUrl + "signup", param.data);
  }
}
