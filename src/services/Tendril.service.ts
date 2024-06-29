import { createInstance, addToken } from "./config";

export class TendrilService {
  static instance = createInstance("tendrils/");
  static TAKE = 10;

  static create(param: Dict) {
    return addToken(this.instance, param).post("create", param.data);
  }

  static update(param: Dict) {
    return addToken(this.instance, param).post(
      "update/" + param.uuid,
      param.data
    );
  }

  static getFeed(param: Dict) {
    return addToken(this.instance, param).get("feed/", {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }

  static getAll(param: Dict) {
    return addToken(this.instance, param).get("all/" + param.plantname, {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }

  static getOne(param: Dict) {
    return addToken(this.instance, param).get(param.uuid);
  }

  static toggleCurl(param: Dict) {
    return addToken(this.instance, param).post("toggle-curl/" + param.uuid);
  }
}
