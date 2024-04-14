import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading, NotFound } from "@/components";
import { TendrilService } from "@/services";
import { RoutesMap } from "@/AppRoutes";
import { usePlant } from "@/hooks";
import { toFeedTendril } from "@/pages/Home/helpers";
import TendrilView from "./TendrilView";

const TendrilPage = () => {
  const { uuid } = useParams();
  const token = usePlant().get("token").unwrapUndef();

  async function getTendril() {
    const resp = await TendrilService.get({ uuid, token });
    return toFeedTendril(resp?.data?.data);
  }

  const { data: tendril, isLoading } = useQuery({
    queryKey: ["getTendril", uuid],
    queryFn: getTendril,
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  });

  if (!uuid) return <Navigate to={RoutesMap.HOME.path} />;

  return (
    <Loading
      div
      on={isLoading}
      className="center p-4 min-h-0 overflow-auto smooth-scroll"
      id="tendril-container"
    >
      {tendril ? (
        <TendrilView tendril={tendril} />
      ) : (
        <NotFound kind="Tendril" />
      )}
    </Loading>
  );
};

export default TendrilPage;
