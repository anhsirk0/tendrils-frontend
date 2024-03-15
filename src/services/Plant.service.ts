import { addToken, createInstance } from "./config";

export class PlantService {
  static instance = createInstance("plants/");

  static getProfile(param: Dict) {
    return addToken(this.instance, param).get("profile/" + param.plantname);
  }

  static getFollowings(param: Dict) {
    return addToken(this.instance, param).get("followings/" + param.plantname);
  }

  static getFollowers(param: Dict) {
    return addToken(this.instance, param).get("followers/" + param.plantname);
  }
}
