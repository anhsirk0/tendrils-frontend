import {
  Fragment,
  ComponentPropsWithRef,
  ElementType,
  createElement,
  ReactNode,
} from "react";
import { Loader as DefaultLoader } from "@/components";
import { Color } from "@/types";

interface LoadingProps<C> {
  on: boolean;
  loaderColor?: Color;
  as?: C;
  Loader?: ReactNode;
  div?: boolean;
}

function Loading<C extends ElementType>({
  on,
  as: component,
  children,
  loaderColor,
  Loader,
  div,
  ...rest
}: LoadingProps<C> & ComponentPropsWithRef<C>) {
  return createElement(
    component ?? (div ? "div" : Fragment),
    div || component ? rest : {},
    on ? Loader || <DefaultLoader color={loaderColor} /> : children
  );
}

export default Loading;
