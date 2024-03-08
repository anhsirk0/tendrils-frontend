import { useCreds } from "@/hooks";

const Profile = () => {
  const plant = useCreds();

  return <div className="text-7xl text-center mt-[20vh]">{plant.name}</div>;
};

export default Profile;
