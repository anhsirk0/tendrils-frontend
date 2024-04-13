import { RoutesMap } from "@/AppRoutes";

function toProfileLink(plantname: string) {
  return "/" + RoutesMap.PROFILE.path.replace(/:.*/, plantname);
}

export default toProfileLink;
