import { FC } from "react";

// local imports
import { toAvatar } from "@/helpers";
import type { PlantProfile } from "./index";
import FollowButton from "./FollowButton";
import TendrilsList from "./TendrilsList";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";
import StatLabel from "./StatLabel";

interface Props {
  profile: PlantProfile;
}

const ProfileView: FC<Props> = ({ profile }) => {
  const { plantname, name, tendrilsCount, followersCount, followingCount } =
    profile;

  return (
    <div className="flex flex-col h-full scroll-smooth max-w-6xl">
      <div className="flex items-center gap-4 md:gap-8 2xl:gap-16 md:mt-2 2xl:mt-8 w-full">
        <div className="avatar placeholder">
          <div className="bg-neutral text-2xl md:text-4xl 2xl:text-6xl text-neutral-content rounded-btn w-40 2xl:w-52">
            {toAvatar(name)}
          </div>
        </div>
        <div className="flex flex-col gap-2 2xl:gap-4">
          <p className="text-xl md:text-3xl 2xl:text-5xl text-base-content">
            {name}
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-lg md:text-xl 2xl:text-3xl text-60">
              @{plantname}
            </p>
            <FollowButton info={profile} />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 2xl:gap-12 text-lg md:text-xl 2xl:text-3xl text-80">
            <a href={"#tendrils"} className="link link-hover">
              <StatLabel total={tendrilsCount} label="Tendrils" />
            </a>
            <FollowingModal plantname={plantname} total={followingCount} />
            <FollowersModal plantname={plantname} total={followersCount} />
          </div>
        </div>
      </div>
      <div className="grow w-full">
        <div className="divider py-2 2xl:py-4" />
        <TendrilsList plantname={plantname} total={tendrilsCount} />
      </div>
    </div>
  );
};

export default ProfileView;
