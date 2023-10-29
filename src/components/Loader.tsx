import { FC } from "react";
import { Color } from "@/types";

export interface LoaderProps {
  color?: Color;
}

const classes = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  neutral: "text-neutral",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const Loader: FC<LoaderProps> = ({ color = "primary" }) => (
  <div className={"loading loading-infinity loading-lg " + classes[color]} />
);

export default Loader;
