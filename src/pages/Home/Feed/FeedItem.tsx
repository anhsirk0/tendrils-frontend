import { FC } from "react";

// icons imports
import { IconHeart, IconMessage } from "@tabler/icons-react";

// local imports
import { FeedTendril } from "@/pages/Home/types";

interface Props {
  tendril: FeedTendril;
}

const FeedItem: FC<Props> = ({ tendril }) => {
  return (
    <div className="card border border-base-content/10 rounded-btn hover:bg-base-content/10">
      <div className="card-body">
        <div className="flex justify-between w-full">
          <h2 className="card-title line-clamp-1 grow">{tendril.title}</h2>
          <p className="text-xl grow-0">{tendril.author.name}</p>
        </div>
        <pre className="line-clamp-6">{tendril.content}</pre>
        <div className="card-actions mt-2 2xl:mt-4 space-x-8">
          <div className="flex gap-4 items-center">
            <button className="active:scale-150 transition">
              <IconHeart className="text-base-content" size={32} />
            </button>
            <p className="text-base-content text-2xl font-medium">
              {tendril.curls.length}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="active:scale-150 transition">
              <IconMessage className="text-base-content" size={32} />
            </button>
            <p className="text-base-content text-2xl font-medium">
              {tendril.curls.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
