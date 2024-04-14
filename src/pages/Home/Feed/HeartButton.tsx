import { FC, createElement } from "react";

// icons imports
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

// local imports
import { useMediaQuery, usePlant } from "@/hooks";

const HeartButton: FC<{ curls: Array<string> }> = ({ curls }) => {
  const plant = usePlant();
  const isLg = useMediaQuery("lg");
  const is2xl = useMediaQuery("2xl");

  const iconSize = is2xl ? 32 : isLg ? 28 : 24;

  return (
    <div className="flex gap-1 md:gap-2 items-center">
      {plant
        .run((p) => curls.includes(p.plantname))
        .run((isLiked) => (
          <button
            className="active:scale-150 transition"
            onClick={(e) => e.stopPropagation()}
          >
            {createElement(isLiked ? IconHeartFilled : IconHeart, {
              size: iconSize,
              className: isLiked ? "text-primary" : "text-base-content",
            })}
          </button>
        ))
        .unwrapOr(<IconHeart size={iconSize} />)}
      <p className="text-sm md:text-md 2xl:text-lg text-base-content font-medium">
        {curls.length}
      </p>
    </div>
  );
};

export default HeartButton;
