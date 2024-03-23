import { FC } from "react";
import { clsx } from "clsx";

import { usePlant } from "@/hooks";
import { toAvatar } from "@/helpers";
import type { PlantProfile } from "./index";

interface Props {
  profile: PlantProfile;
}

const ProfileView: FC<Props> = ({ profile }) => {
  const plant = usePlant();
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 md:gap-8 xl:gap-16 md:mt-4 xl:mt-24">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-24 md:w-40 xl:w-52">
            <span className="text-2xl md:text-4xl xl:text-6xl">
              {toAvatar(profile.name)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 xl:gap-4">
          <p className="text-xl md:text-3xl xl:text-5xl text-base-content">
            {profile.name}
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-lg md:text-xl xl:text-3xl text-base-content/60">
              @{profile.plantname}
            </p>
            {plant
              .run((p) => p.plantname === profile.plantname)
              .run((isMe) =>
                isMe ? (
                  <div className="badge badge-primary xl:badge-xl">you</div>
                ) : (
                  <button
                    className={clsx(
                      "btn btn-sm xl:btn-md btn-primary capitalize",
                      profile.isFollowed && "btn-outline",
                    )}
                  >
                    {profile.isFollowed && "un"}follow
                  </button>
                ),
              )
              .unwrapNull()}
          </div>
          <div className="flex gap-16 text-lg md:text-xl xl:text-3xl text-base-content/80">
            {[
              { label: "Tendrils", value: profile.tendrilsCount },
              { label: "Following", value: profile.followingCount },
              { label: "Followers", value: profile.followersCount },
            ].map((info) => (
              <p key={info.label}>
                {info.value}
                <span className="pl-2 md:pl-3 xl:pl-4 text-base-content/60">
                  {info.label}
                </span>
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
