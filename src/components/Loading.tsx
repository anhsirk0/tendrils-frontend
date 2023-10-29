import {
  Fragment,
  ComponentPropsWithoutRef,
  ElementType,
  createElement,
} from "react";
import { Loader } from "@/components";
import { Color } from "@/types";

interface LoadingProps<C> {
  on: boolean;
  color?: Color;
  component?: C;
}

function Loading<C extends ElementType>({
  on,
  component,
  children,
  color,
  ...rest
}: LoadingProps<C> & ComponentPropsWithoutRef<C>) {
  return createElement(
    component || Fragment,
    component ? rest : {},
    on ? <Loader color={color} /> : children,
  );
}

export default Loading;
