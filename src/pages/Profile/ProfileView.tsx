import { FC } from "react";
import type { PlantProfile } from "./index";
import { toAvatar } from "@/helpers";

interface Props {
  profile: PlantProfile;
}

const ProfileView: FC<Props> = ({ profile }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 md:gap-16 md:mt-24">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-24 md:w-52">
            <span className="text-3xl md:text-5xl">
              {toAvatar(profile.name)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl md:text-5xl text-base-content">
            {profile.name}
          </p>
          <p className="text-xl md:text-3xl text-base-content/60">
            @{profile.plantname}
          </p>
          <div className="flex gap-16 text-lg md:text-xl xl:text-3xl text-base-content/80">
            {[
              { label: "Posts", value: profile.postsCount },
              { label: "Following", value: profile.followingCount },
              { label: "Followers", value: profile.followersCount },
            ].map((info) => (
              <p>
                {info.value}
                <span className="pl-4 text-base-content/60">{info.label}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="grow"></div>
    </div>
  );
};

export default ProfileView;
