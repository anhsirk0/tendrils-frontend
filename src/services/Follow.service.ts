import { addToken, createInstance } from "./config";

type Plantname = Pick<Plant, "plantname">;
type ToggleParam = Plantname & TokenOpt;
type GetFollowParam = Plantname & TokenOpt & { page: number };

export class FollowService {
  static instance = createInstance("follows/");
  static TAKE = 10;

  static toggle(param: ToggleParam) {
    return addToken(this.instance, param).post("toggle-follow/", {
      plantname: param.plantname,
    });
  }

  static getFollowing(param: GetFollowParam) {
    return addToken(this.instance, param).get("following/" + param.plantname, {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }

  static getFollowers(param: GetFollowParam) {
    return addToken(this.instance, param).get("followers/" + param.plantname, {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }
}
