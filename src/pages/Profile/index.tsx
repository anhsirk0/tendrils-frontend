import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";

import { usePlant } from "@/hooks";
import { Some } from "@/helpers";
import { PlantService } from "@/services";
import { Loading } from "@/components";
import { RoutesMap } from "@/AppRoutes";
import ProfileView from "./ProfileView";

export interface PlantProfile extends Pick<Plant, "id" | "name" | "plantname"> {
  followersCount: number;
  followingCount: number;
  tendrilsCount: number;
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
    tendrilsCount: Some.Number(p?.tendrilsCount),
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
    <Loading on={isLoading} component="div" className="center h-full p-4">
      {profile ? (
        <ProfileView profile={profile} />
      ) : (
        <NotFound name={plantname} />
      )}
    </Loading>
  );
};

const NotFound: FC<{ name: string }> = ({ name }) => (
  <div className="text-7xl text-center">User &apos;{name}&apos; not found</div>
);

export default Profile;
