import { RoutesMap } from "@/AppRoutes";

function toTendrilLink(uuid: string) {
  return "/" + RoutesMap.TENDRILS.path.replace(/:.*/, uuid);
}

export default toTendrilLink;
