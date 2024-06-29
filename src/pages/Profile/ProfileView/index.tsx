import { FC } from "react";

// icons imports
import { IconEdit } from "@tabler/icons-react";

// local imports
import { toAvatar } from "@/helpers";
import { usePageTitle, useResponsive, usePlant } from "@/hooks";
import type { PlantProfile } from "../types";
import FollowButton from "./FollowButton";
import TendrilsList from "./TendrilsList";
import FollowingModal from "./Modals/FollowingModal";
import FollowersModal from "./Modals/FollowersModal";
import StatLabel from "./StatLabel";

interface Props {
  profile: PlantProfile;
  onEditClick: Fn0;
}

const ProfileView: FC<Props> = ({ profile, onEditClick }) => {
  const {
    avatarUrl,
    plantname,
    name,
    tendrilsCount,
    followersCount,
    followingCount,
  } = profile;
  usePageTitle(name);
  const plant = usePlant();
  const R = useResponsive();

  return (
    <div className="flex flex-col h-full max-w-7xl w-full">
      <div className="flex items-center gap-4 md:gap-8 2xl:gap-16 md:mt-2 2xl:mt-8 w-full">
        <div className="avatar placeholder">
          <div className="bg-neutral text-2xl md:text-4xl 2xl:text-6xl text-neutral-content rounded-btn w-32 md:w-40 2xl:w-44">
            {avatarUrl ? <img alt="avatar" src={avatarUrl} /> : toAvatar(name)}
          </div>
        </div>
        <div className="flex flex-col gap-2 2xl:gap-4">
          <h2 className="text-xl md:text-2xl 2xl:text-4xl text-base-content font-semibold">
            {name}
          </h2>
          <div className="flex gap-4 items-center">
            <p className="text-lg md:text-xl 2xl:text-3xl text-60">
              @{plantname}
            </p>
            {plant.Render(() => (
              <FollowButton info={profile} />
            ))}
          </div>
          <div className="flex flex-col md:flex-row md:gap-8 2xl:gap-12 md:text-lg lg:text-xl 2xl:text-2xl text-80">
            <a href="#tendrils" className="link link-hover">
              <StatLabel total={tendrilsCount} label="Tendrils" />
            </a>
            <FollowingModal plantname={plantname} total={followingCount} />
            <FollowersModal plantname={plantname} total={followersCount} />
          </div>
        </div>
      </div>
      <div className="grow w-full" id="tendrils">
        <div className="divider py-3 2xl:py-6" />
        <TendrilsList
          plant={{ plantname, name, avatarUrl }}
          total={tendrilsCount}
        />
      </div>
      {profile.isMe && (
        <div className="fixed bottom-2 right-4 2xl:bottom-4 2xl:right-8">
          <div className="tooltip tooltip-primary" data-tip="Edit Profile">
            <button
              className="btn btn-primary btn-sm 2xl:btn-md"
              onClick={onEditClick}
            >
              <IconEdit size={R({ base: 20, lg: 24, "2xl": 28 })} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
