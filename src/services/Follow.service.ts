import { addToken, createInstance } from "./config";

export class FollowService {
  static instance = createInstance("follows/");
  static TAKE = 10;

  static toggle(param: Pick<Plant, "plantname"> & TokenOpt) {
    return addToken(this.instance, param).post("toggle-follow/", {
      plantname: param.plantname,
    });
  }

  static getFollowing(
    param: Pick<Plant, "plantname"> & TokenOpt & { page: number }
  ) {
    return addToken(this.instance, param).get("following/" + param.plantname, {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }

  static getFollowers(
    param: Pick<Plant, "plantname"> & TokenOpt & { page: number }
  ) {
    return addToken(this.instance, param).get("followers/" + param.plantname, {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }
}
