import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";

import { usePlant } from "@/hooks";
import { Some } from "@/helpers";
import { PlantService } from "@/services";
import { Loading } from "@/components";
import { RoutesMap } from "@/AppRoutes";

interface PlantProfile extends Pick<Plant, "id" | "name" | "plantname"> {
  followersCount: number;
  followingCount: number;
  isFollowed: boolean;
  createdAt: number;
}

function toPlantProfile(p: BackendData): PlantProfile {
  return {
    id: Some.Number(p?.id),
    name: Some.String(p?.name),
    plantname: Some.String(p?.plantname),
    followersCount: Some.Number(p?.followersCount),
    followingCount: Some.Number(p?.followingCount),
    isFollowed: Some.Boolean(p?.isFollowed),
    createdAt: Some.Number(p?.createdAt),
  };
}

const Profile = () => {
  const { plantname } = useParams();
  const plant = usePlant();

  async function getProfile() {
    const resp = await PlantService.getProfile({
      plantname,
      token: plant.get("token").unwrapUndef(),
    });
    return toPlantProfile(resp?.data?.data);
  }

  const { data: profile, isLoading } = useQuery({
    queryKey: ["getProfile", plantname],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    enabled: !!plantname,
  });

  if (!plantname) return <Navigate to={RoutesMap.HOME.path} />;

  return (
    <Loading
      on={isLoading}
      component="div"
      // className="join join-vertical min-h-0 grow"
    >
      {profile ? (
        <div className="text-7xl text-center mt-[20vh]">{plantname}</div>
      ) : (
        <div className="text-7xl text-center mt-[20vh]">User not found</div>
      )}
    </Loading>
  );
};

export default Profile;
