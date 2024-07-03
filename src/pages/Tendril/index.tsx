import { useState } from "react";

// other imports
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// local imports
import { RoutesMap } from "@/AppRoutes";
import { Loading, NotFound } from "@/components";
import { usePlant } from "@/hooks";
import { toFeedTendril } from "@/pages/Home/helpers";
import { TendrilService } from "@/services";
import TendrilView from "./TendrilView";
import TendrilForm from "../Create/TendrilForm";

const TendrilPage = () => {
  const { uuid } = useParams();
  const token = usePlant().prop("token").getUndef();
  const [isEditing, setIsEditing] = useState(false);

  async function getTendril() {
    const resp = await TendrilService.getOne({ uuid, token });
    return toFeedTendril(resp?.data?.data);
  }

  const {
    data: tendril,
    isLoading,
    refetch,
  } = useQuery({
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
      className={
        isEditing
          ? "min-h-0 h-full"
          : "center p-4 overflow-auto smooth-scroll grow"
      }
      id="tendril-container"
    >
      {!tendril ? (
        <NotFound kind="Tendril" />
      ) : isEditing ? (
        <TendrilForm
          uuid={tendril.uuid}
          data={{ title: tendril.title, content: tendril.content }}
          onCancel={() => setIsEditing(false)}
          afterSuccess={() => (refetch(), setIsEditing(false))}
        />
      ) : (
        <TendrilView tendril={tendril} onEditClick={() => setIsEditing(true)} />
      )}
    </Loading>
  );
};

export default TendrilPage;
