import RoutesMap from "./RoutesMap";
import type { AppRoute } from "./types";

const appRoutes: Array<AppRoute> = Object.keys(RoutesMap).map(
  (key) => RoutesMap[key as keyof RoutesMap]
);

export default appRoutes;
