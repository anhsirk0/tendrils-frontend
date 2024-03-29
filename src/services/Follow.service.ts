import { addToken, createInstance } from "./config";

export class FollowService {
  static instance = createInstance("follows/");

  static toggle(param: Dict) {
    return addToken(this.instance, param).post("toggle-follow/", {
      plantname: param.plantname,
    });
  }

  static getFollowing(param: Dict) {
    return addToken(this.instance, param).get("following/" + param.plantname);
  }

  static getFollowers(param: Dict) {
    return addToken(this.instance, param).get("followers/" + param.plantname);
  }
}
