import axios, { AxiosInstance } from "axios";

export function createInstance(base: string = "") {
  return axios.create({
    baseURL: "http://localhost:8000/" + base,
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
