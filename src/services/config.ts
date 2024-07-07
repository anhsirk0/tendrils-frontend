import axios, { AxiosInstance } from "axios";
import env from "@/environment";

export function createInstance(base: string = "") {
  return axios.create({
    baseURL: env.apiUrl + base,
    timeout: 1000,
  });
}

export function addToken(instance: AxiosInstance, param: Dict) {
  instance.defaults.headers.common["Authorization"] = "Bearer " + param.token;
  return instance;
}

export function tokenHeader(param: Dict) {
  return { headers: { Authorization: "Bearer " + param.token } };
}
