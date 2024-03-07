import { LazyExoticComponent, MemoExoticComponent, FC } from "react";

export type AppRoute = {
  title: string;
  path: string;
  // subRoutes: Array<AppRoute>;
  subRoutes: Record<string, AppRoute>;
  kind: "public" | "private" | "independent";
  Skeleton?: MemoExoticComponent<FC<any>> | (() => JSX.Element);
  //Icon: () => JSX.Element;
  Element: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
};
