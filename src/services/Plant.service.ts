import { addToken, createInstance } from "./config";

type Plantname = Pick<Plant, "plantname">;
type GetProfileParam = Plantname & TokenOpt;
type UpdateProfileParam = Pick<Plant, "token"> & {
  data: Pick<Plant, "name" | "avatarUrl">;
};

export class PlantService {
  static instance = createInstance("plants/");

  static getProfile(param: GetProfileParam) {
    return addToken(this.instance, param).get("profile/" + param.plantname);
  }

  static updateProfile(param: UpdateProfileParam) {
    return addToken(this.instance, param).post("update/", param.data);
  }
  static getPopular() {
    return this.instance.get("popular");
  }
}
