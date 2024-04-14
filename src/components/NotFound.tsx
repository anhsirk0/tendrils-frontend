import { FC } from "react";

interface Props {
  msg?: string;
  kind?: "Tendril" | "Plant";
}

const NotFound: FC<Props> = ({ msg, kind }) => (
  <div className="text-7xl text-center">
    {msg || (kind || "Page") + " not found"}
  </div>
);

export default NotFound;
