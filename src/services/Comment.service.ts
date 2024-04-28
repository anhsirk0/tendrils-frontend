import { createInstance, addToken } from "./config";

export class CommentService {
  static instance = createInstance("comment/");

  static add(param: Dict) {
    return addToken(this.instance, param).post("add", param.data);
  }

  static getAll(param: Dict) {
    return addToken(this.instance, param).get(param.uuid);
  }
}
