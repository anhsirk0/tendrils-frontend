import { FC } from "react";

// icons imports
import { IconMessage } from "@tabler/icons-react";

// other imports
import { format } from "date-fns";
import { clsx } from "clsx";
import { useNavigate, Link } from "react-router-dom";

// local imports
import { toAvatar, toProfileLink, toTendrilLink } from "@/helpers";
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

  return (
    <div
      role="button"
      className="p-4 md:p-6 2xl:p-8 flex flex-col gap-2 md:gap-4 border border-base-content/10 rounded-btn hover:bg-base-content/5"
      onClick={() => navigate(toTendrilLink(tendril.uuid))}
    >
      <h2 className="text-lg md:text-xl 2xl:text-2xl font-bold line-clamp-1">
        {tendril.title}
      </h2>
      <pre
        className={clsx(
          "text-sm md:text-md 2xl:text-lg",
          compact ? "line-clamp-4" : "line-clamp-6"
        )}
      >
        {tendril.content}
      </pre>
      <div className="grow" />
      <div className="flex gap-2 md:gap-4 mt-2 2xl:mt-4">
        <HeartButton curls={tendril.curls} uuid={tendril.uuid} />
        <div className="flex gap-1 md:gap-2 items-center [&>*]:text-base-content">
          <IconMessage size={R({ base: 24, lg: 28, "2xl": 32 })} />
          <p className="text-sm md:text-md 2xl:text-lg font-medium">
            {tendril.commentsCount}
          </p>
        </div>
        <div className="grow" />
        <div className="flex gap-1 md:gap-2 items-center">
          <p className="text-sm md:text-md 2xl:text-xl text-80">
            {format(tendril.createdAt, "hh:mm aa, dd-MM-yyyy")}
            {!compact && <span className="text-60"> by</span>}
          </p>
          {!compact && <AuthorInfo {...tendril.author} />}
        </div>
      </div>
    </div>
  );
};

const AuthorInfo: FC<FeedTendril["author"]> = ({ plantname, name }) => (
  <Link
    to={toProfileLink(plantname)}
    onClick={(e) => e.stopPropagation()}
    className="flex items-center max-w-[3rem] 2xl:max-w-[3.5rem] hover:max-w-[12rem] transition-all duration-100 group"
  >
    <p className="truncate text-sm md:text-md 2xl:text-xl w-0 group-hover:w-auto">
      {name}
    </p>
    <div className="avatar placeholder pl-2">
      <div className="bg-neutral text-neutral-content text-xs md:text-sm 2xl:text-md rounded-btn w-6 2xl:w-8">
        {toAvatar(name)}
      </div>
    </div>
  </Link>
);

export default FeedItem;
