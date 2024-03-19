import { addToken, createInstance } from "./config";

export class FollowService {
  static instance = createInstance("follows/");

  static getFollowing(param: Dict) {
    return addToken(this.instance, param).get("following/" + param.plantname);
  }

  static getFollowers(param: Dict) {
    return addToken(this.instance, param).get("followers/" + param.plantname);
  }
}
