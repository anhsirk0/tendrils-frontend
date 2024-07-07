import { useState } from "react";

// other imports
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// local imports
import { RoutesMap } from "@/AppRoutes";
import { Loading, NotFound } from "@/components";
import { usePageTitle, usePlant } from "@/hooks";
import { PlantService } from "@/services";
import { toPlantProfile } from "./helpers";
import ProfileView from "./ProfileView";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { plantname } = useParams();
  usePageTitle("@" + plantname);
  const token = usePlant().prop("token").getUndef();
  const [isEditing, setIsEditing] = useState(false);

  async function getProfile() {
    if (!plantname) throw Error("This wont happen");
    const resp = await PlantService.getProfile({ plantname, token });
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
      {!profile ? (
        <NotFound kind="Plant" />
      ) : isEditing ? (
        <EditProfile profile={profile} onCancel={() => setIsEditing(false)} />
      ) : (
        <ProfileView
          key={plantname}
          profile={profile}
          onEditClick={() => setIsEditing(true)}
        />
      )}
    </Loading>
  );
};

export default Profile;
