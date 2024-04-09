import { FC } from "react";

// other imports
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { PlantService } from "@/services";
import { RoutesMap } from "@/AppRoutes";
import { Some } from "@/helpers";
import { usePlant } from "@/hooks";
import ProfileView from "./ProfileView";

export interface PlantProfile extends Pick<Plant, "id" | "name" | "plantname"> {
  followersCount: number;
  followingCount: number;
  tendrilsCount: number;
  isFollowed: boolean;
  createdAt: number;
  isMe: boolean;
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
    isMe: Some.Boolean(p?.isMe),
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
    <Loading div on={isLoading} className="center h-full w-full p-4">
      {profile ? (
        <ProfileView profile={profile} key={plantname} />
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
