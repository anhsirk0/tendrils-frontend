import { FC } from "react";

import { usePlant } from "@/hooks";
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
  const plant = usePlant();

  return (
    <div className="flex flex-col h-full scroll-smooth w-full md:w-auto">
      <div className="flex items-center gap-4 md:gap-8 xl:gap-16 md:mt-4 xl:mt-24">
        <div className="avatar placeholder">
          <div className="bg-neutral text-2xl md:text-4xl xl:text-6xl text-neutral-content rounded-full w-40 xl:w-52">
            {toAvatar(name)}
          </div>
        </div>
        <div className="flex flex-col gap-2 xl:gap-4">
          <p className="text-xl md:text-3xl xl:text-5xl text-base-content">
            {name}
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-lg md:text-xl xl:text-3xl text-60">
              @{plantname}
            </p>
            {plant
              .run((p) => p.plantname === plantname)
              .run((isMe) =>
                isMe ? <YouBadge /> : <FollowButton profile={profile} />
              )
              .unwrapNull()}
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 xl:gap-12 text-lg md:text-xl xl:text-3xl text-base-content/80">
            <a href={"#tendrils"} className="link link-hover">
              <StatLabel total={tendrilsCount} label="Tendrils" />
            </a>
            <FollowingModal plantname={plantname} total={followingCount} />
            <FollowersModal plantname={plantname} total={followersCount} />
          </div>
        </div>
      </div>
      <div className="grow">
        <div className="divider" />
        <TendrilsList plantname={plantname} total={tendrilsCount} />
      </div>
    </div>
  );
};

const YouBadge: FC = () => (
  <div className="badge badge-primary xl:badge-xl">You</div>
);

export default ProfileView;
