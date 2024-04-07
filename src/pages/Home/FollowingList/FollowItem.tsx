import { FC } from "react";

// other imports
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";

// local imports
import { RoutesMap } from "@/AppRoutes";
import { toAvatar } from "@/helpers";
import { Followee } from "@/pages/Home/types";
import FollowButton from "@/pages/Profile/FollowButton";

interface Props {
  followee: Followee;
  compact?: boolean;
}

const FollowItem: FC<Props> = ({ followee, compact }) => {
  const navigate = useNavigate();
  function onClick() {
    navigate("/" + RoutesMap.PROFILE.path.replace(/:.*/, followee.plantname));
  }

  return (
    <div
      role="button"
      className="btn-ghost rounded-btn flex flex-row gap-4 items-center p-2"
      onClick={onClick}
    >
      <div className="avatar placeholder">
        <div
          className={clsx(
            "bg-neutral text-neutral-content text-sm md:text-md 2xl:text-xl rounded-btn",
            compact ? "w-8 2xl:w-12" : "w-12 2xl:w-16"
          )}
        >
          {toAvatar(followee.name)}
        </div>
      </div>
      <div className="flex flex-col grow">
        <p
          className={clsx(
            "truncate",
            compact ? "text-sm md:text-md 2xl:text-xl" : "md:text-xl 2xl:text-2xl"
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
      {!compact && !followee.isMe && <FollowButton info={followee} />}
    </div>
  );
};

export default FollowItem;
