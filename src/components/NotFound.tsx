import { FC } from "react";
import { usePageTitle } from "@/hooks";

interface Props {
  msg?: string;
  kind?: "Tendril" | "Plant";
}

const NotFound: FC<Props> = ({ msg, kind }) => {
  usePageTitle("Not found");
  return (
    <div className="text-7xl text-center">
      {msg || (kind || "Page") + " not found"}
    </div>
  );
};

export default NotFound;
