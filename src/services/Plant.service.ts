import { instance } from "./config";

export class PlantService {
  static baseUrl = "/plants/";

  static getProfile(param: Dict) {
    return instance.get(this.baseUrl + "profile/" + param.plantname, {
      headers: { Authorization: "Bearer " + param.token },
    });
  }

  static getFollowings(param: Dict) {
    return instance.get(this.baseUrl + "followings/" + param.plantname, {
      headers: { Authorization: "Bearer " + param.token },
    });
  }

  static getFollowers(param: Dict) {
    return instance.get(this.baseUrl + "followers/" + param.plantname, {
      headers: { Authorization: "Bearer " + param.token },
    });
  }
}
