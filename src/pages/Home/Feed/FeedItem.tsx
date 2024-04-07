import { FC } from "react";

// icons imports
import { IconHeart, IconMessage } from "@tabler/icons-react";

// local imports
import { Tendril } from "@/pages/Home/types";

interface Props {
  tendril: Tendril;
}

const FeedItem: FC<Props> = ({ tendril }) => {
  return (
    <div className="card bg-base-100 border border-neutral rounded-btn">
      <div className="card-body">
        <h2 className="card-title">{tendril.title}</h2>
        <p className="clamp-4">{tendril.content}</p>
        <div className="card-actions mt-2 2xl:mt-4 space-x-8">
          <div className="flex gap-4 items-center">
            <button className="active:scale-150 transition">
              <IconHeart className="text-primary" size={32} />
            </button>
            <p className="text-primary text-2xl font-medium">
              {tendril.curls.length}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="active:scale-150 transition">
              <IconMessage className="text-primary" size={32} />
            </button>
            <p className="text-primary text-2xl font-medium">
              {tendril.curls.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
