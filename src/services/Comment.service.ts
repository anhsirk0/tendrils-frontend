import { createInstance, addToken } from "./config";

type AddParam = { data: { content: string; uuid: string } } & TokenOpt;
type GetAllParam = { uuid: string; page: number } & TokenOpt;

export class CommentService {
  static instance = createInstance("comment/");
  static TAKE = 10;

  static add(param: AddParam) {
    return addToken(this.instance, param).post("add", param.data);
  }

  static getAll(param: GetAllParam) {
    return addToken(this.instance, param).get(param.uuid, {
      params: { take: this.TAKE, skip: param.page * this.TAKE },
    });
  }
}
