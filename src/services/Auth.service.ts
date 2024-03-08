import { instance } from "./config";

export class AuthService {
  static baseUrl = "/auth/";

  static login(param: Dict) {
    return instance.post(this.baseUrl + "signin", param.data);
  }

  static signup(param: Dict) {
    return instance.post(this.baseUrl + "signup", param.data);
  }
}
