import { FC, useState, createElement } from "react";

// icons imports
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";

// local imports
import { TendrilService } from "@/services";
import { useResponsive, usePlant, useApi } from "@/hooks";

interface Props {
  curls: Array<string>;
  uuid: string;
}

const HeartButton: FC<Props> = ({ curls, uuid }) => {
  const plant = usePlant();
  const R = useResponsive();
  const [count, setCount] = useState(curls.length);

  return (
    <div className="flex gap-1 md:gap-2 items-center">
      {plant
        .run((p) => curls.includes(p.plantname))
        .run((curled) => (
          <Btn curled={curled} uuid={uuid} setCount={setCount} />
        ))
        .unwrapOr(<IconHeart size={R({ base: 20, lg: 24, "2xl": 28 })} />)}
      <p className="text-sm md:text-md 2xl:text-lg text-base-content font-medium">
        {count}
      </p>
    </div>
  );
};

type BtnProps = { curled: boolean; uuid: string; setCount: SetStateFn<number> };
const Btn: FC<BtnProps> = ({ curled, uuid, setCount }) => {
  const token = usePlant().unwrap().token;
  const [isCurled, setIsCurled] = useState(curled);
  const R = useResponsive();

  const { mutate } = useApi({
    fn: () => TendrilService.toggleCurl({ uuid, token }),
    onSuccess: () => {
      setIsCurled(!isCurled);
      setCount((c) => c + (isCurled ? -1 : 1));
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <button
      className="active:scale-150 transition"
      onClick={(e) => (e.stopPropagation(), mutate())}
    >
      {createElement(isCurled ? IconHeartFilled : IconHeart, {
        size: R({ base: 20, lg: 24, "2xl": 28 }),
        className: isCurled ? "text-primary" : "text-base-content",
      })}
    </button>
  );
};

export default HeartButton;
