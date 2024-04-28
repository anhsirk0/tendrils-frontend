import { FC } from "react";
import { PlantProfile } from "../types";

interface Props {
  profile: PlantProfile;
  onCancel: Fn0;
}

const EditProfile: FC<Props> = ({ profile, onCancel }) => {
  return (
    <div className="flex">
      <h2 className="text-lg md:text-xl 2xl:text-2xl font-bold line-clamp-1">
        {profile.plantname}
      </h2>
      <button onClick={onCancel}>cancel</button>
    </div>
  );
};

export default EditProfile;
