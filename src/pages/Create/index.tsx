// local imports
import { usePageTitle } from "@/hooks";
import { RoutesMap } from "@/AppRoutes";
import TendrilForm from "./TendrilForm";

const Create = () => {
  usePageTitle(RoutesMap.CREATE.title);
  return <TendrilForm />;
};

export default Create;
