import { addToken, createInstance } from "./config";

export class PlantService {
  static instance = createInstance("plants/");

  static getProfile(param: Dict) {
    return addToken(this.instance, param).get("profile/" + param.plantname);
  }
}
