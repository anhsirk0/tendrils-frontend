import { FC } from "react";

// other imports
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";

// local imports
import { toAvatar, toProfileLink } from "@/helpers";
import { Followee } from "@/pages/Home/types";
import FollowButton from "@/pages/Profile/ProfileView/FollowButton";

interface Props {
  followee: Followee;
  compact?: boolean;
}

const FollowItem: FC<Props> = ({ followee, compact }) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      className="btn-ghost rounded-btn flex flex-row gap-4 items-center p-2"
      onClick={() => navigate(toProfileLink(followee.plantname))}
    >
      <div className="avatar placeholder">
        <div
          className={clsx(
            "bg-neutral text-neutral-content text-sm md:text-md 2xl:text-xl rounded-btn",
            compact ? "w-6 2xl:w-10" : "w-10 2xl:w-14"
          )}
        >
          {followee.avatarUrl ? (
            <img alt="avatar" src={followee.avatarUrl} />
          ) : (
            toAvatar(followee.name)
          )}
        </div>
      </div>
      <div className="flex flex-col grow">
        <p
          className={clsx(
            "truncate",
            compact
              ? "text-xs md:text-sm 2xl:text-lg"
              : "md:text-lg 2xl:text-xl"
          )}
        >
          {followee.name}
        </p>
        {!compact && (
          <p className="text-xs md:text-sm 2xl:text-lg text-60">
            @{followee.plantname}
          </p>
        )}
      </div>
      {!compact && <FollowButton info={followee} />}
    </div>
  );
};

export default FollowItem;
