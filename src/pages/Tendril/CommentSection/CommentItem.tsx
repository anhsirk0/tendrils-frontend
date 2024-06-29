import { FC, useMemo } from "react";

// other imports
import { Link } from "react-router-dom";

// local imports
import { toAvatar, toProfileLink, toDateStr } from "@/helpers";
import { Comment } from "../types";

type Props = { comment: Comment };

const CommentItem: FC<Props> = ({ comment }) => {
  const { plant } = comment;
  const dateStr = useMemo(
    () => toDateStr(comment.createdAt),
    [comment.createdAt]
  );

  return (
    <div className="flex flex-col gap-1 md:gap-2 border border-base-content/30 rounded-btn p-2 2xl:p-4">
      <Link
        to={toProfileLink(plant.plantname)}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center btn-ghost rounded-btn w-fit p-1 2xl:p-2 -m-1 2xl:-m-2"
      >
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content md:text-lg 2xl:text-xl rounded-btn w-10 2xl:w-12">
            {plant.avatarUrl ? (
              <img alt="avatar" src={plant.avatarUrl} />
            ) : (
              toAvatar(plant.name)
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 md:gap-2">
            <p className="truncate 2xl:text-lg px-2 font-bold">{plant.name}</p>
            <p className="2xl:text-lg text-80">{dateStr}</p>
          </div>
          <p className="truncate text-xs md:text-sm 2xl:text-md px-2">
            @{plant.plantname}
          </p>
        </div>
      </Link>
      <p className="text-sm md:text-md 2xl:text-xl">{comment.content}</p>
    </div>
  );
};

export default CommentItem;
