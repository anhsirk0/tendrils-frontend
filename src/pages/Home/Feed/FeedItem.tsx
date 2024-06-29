import { FC, useMemo } from "react";

// icons imports
import { IconMessage } from "@tabler/icons-react";

// other imports
import { clsx } from "clsx";
import { useNavigate, Link } from "react-router-dom";

// local imports
import { toAvatar, toProfileLink, toTendrilLink, toDateStr } from "@/helpers";
import { useResponsive } from "@/hooks";
import { FeedTendril } from "@/pages/Home/types";
import HeartButton from "./HeartButton";

interface Props {
  tendril: FeedTendril;
  compact?: boolean;
}

const FeedItem: FC<Props> = ({ tendril, compact }) => {
  const R = useResponsive();
  const navigate = useNavigate();

  const dateStr = useMemo(
    () => toDateStr(tendril.createdAt),
    [tendril.createdAt]
  );

  return (
    <div
      role="button"
      className="p-4 2xl:p-6 flex flex-col gap-2 md:gap-4 border border-base-content/10 rounded-btn hover:bg-base-content/5"
      onClick={() => navigate(toTendrilLink(tendril.uuid))}
    >
      <h2 className="text-md md:text-lg 2xl:text-xl font-bold line-clamp-1">
        {tendril.title}
      </h2>
      <pre
        className={clsx(
          "text-xs md:text-sm 2xl:text-md",
          compact ? "line-clamp-4" : "line-clamp-6"
        )}
      >
        {tendril.content}
      </pre>
      <div className="grow" />
      <div className="flex gap-2 md:gap-4 mt-2 2xl:mt-4">
        <HeartButton curls={tendril.curls} uuid={tendril.uuid} />
        <div className="flex gap-1 md:gap-2 items-center [&>*]:text-base-content">
          <IconMessage size={R({ base: 20, lg: 24, "2xl": 28 })} />
          <p className="text-sm md:text-md 2xl:text-lg font-medium">
            {tendril.commentsCount}
          </p>
        </div>
        <div className="grow" />
        <div className="flex gap-1 md:gap-2 items-center">
          <p className="text-xs md:text-sm 2xl:text-lg text-80">
            {dateStr}
            {!compact && <span className="text-60"> by</span>}
          </p>
          {!compact && <AuthorInfo {...tendril.author} />}
        </div>
      </div>
    </div>
  );
};

const AuthorInfo: FC<FeedTendril["author"]> = (author) => (
  <Link
    to={toProfileLink(author.plantname)}
    onClick={(e) => e.stopPropagation()}
    className="flex items-center max-w-[3rem] 2xl:max-w-[3.5rem] hover:max-w-[12rem] transition-all duration-100 group"
  >
    <p className="truncate text-sm md:text-md 2xl:text-xl w-0 group-hover:w-auto">
      {author.name}
    </p>
    <div className="avatar placeholder pl-2">
      <div className="bg-neutral text-neutral-content text-xs md:text-sm 2xl:text-md rounded-btn w-6 2xl:w-8">
        {author.avatarUrl ? (
          <img alt="avatar" src={author.avatarUrl} />
        ) : (
          toAvatar(author.name)
        )}
      </div>
    </div>
  </Link>
);

export default FeedItem;
