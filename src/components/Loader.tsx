import { FC } from "react";
import { Color } from "@/types";
import { clsx } from "clsx";

export type LoaderProps = { color?: Color; className?: string };

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

const Loader: FC<LoaderProps> = ({ color = "primary", className }) => (
  <div
    className={clsx(
      "loading loading-infinity 2xl:loading-lg",
      classes[color],
      className
    )}
  />
);

export default Loader;
