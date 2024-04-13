import { FC } from "react";

// icons imports
import { IconHeart, IconMessage } from "@tabler/icons-react";

// other imports
import { format } from "date-fns";

// local imports
import { toAvatar } from "@/helpers";
import { useMediaQuery } from "@/hooks";
import { FeedTendril } from "@/pages/Home/types";

const FeedItem: FC<{ tendril: FeedTendril }> = ({ tendril }) => {
  const isLg = useMediaQuery("lg");
  const is2xl = useMediaQuery("2xl");

  return (
    <div
      role="button"
      className="p-4 md:p-6 2xl:p-8 flex flex-col gap-2 md:gap-4 border border-base-content/10 rounded-btn hover:bg-base-content/5"
    >
      <h2 className="text-lg md:text-xl 2xl:text-2xl font-bold line-clamp-1">
        {tendril.title}
      </h2>
      <pre className="text-sm md:text-md 2xl:text-lg line-clamp-6">
        {tendril.content}
      </pre>
      <div className="flex gap-2 md:gap-4 mt-2 2xl:mt-4">
        <div className="flex gap-1 md:gap-2 items-center">
          <button className="active:scale-150 transition">
            <IconHeart
              className="text-base-content"
              size={is2xl ? 32 : isLg ? 28 : 24}
            />
          </button>
          <p className="text-sm md:text-md 2xl:text-lg text-base-content font-medium">
            {tendril.curls.length}
          </p>
        </div>
        <div className="flex gap-1 md:gap-2 items-center">
          <button className="active:scale-150 transition">
            <IconMessage
              className="text-base-content"
              size={is2xl ? 32 : isLg ? 28 : 24}
            />
          </button>
          <p className="text-sm md:text-md 2xl:text-lg text-base-content font-medium">
            {tendril.commentsCount}
          </p>
        </div>
        <div className="grow" />
        <div className="flex gap-1 md:gap-2 items-center">
          <p className="text-sm md:text-md 2xl:text-xl">
            {format(tendril.createdAt, "dd-MM-yyyy")}
            <span className="text-60"> by</span>
          </p>
          <div className="flex items-center max-w-[3rem] 2xl:max-w-[3.5rem] hover:max-w-[12rem] transition-all duration-100 group">
            <p className="truncate text-sm md:text-md 2xl:text-xl w-0 group-hover:w-auto">
              {tendril.author.name}
            </p>
            <div className="avatar placeholder pl-2">
              <div className="bg-neutral text-neutral-content text-xs md:text-sm 2xl:text-md rounded-btn w-6 2xl:w-8">
                {toAvatar(tendril.author.name)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
