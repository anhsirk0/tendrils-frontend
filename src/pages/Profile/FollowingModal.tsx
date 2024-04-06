import { FC } from "react";

// other imports
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";

// local imports
import { Loading } from "@/components";
import { toAvatar } from "@/helpers";
import { usePlant } from "@/hooks";
import { useFollowing } from "@/pages/Home/helpers";
import { Followee } from "@/pages/Home/types";
import StatLabel from "./StatLabel";
import { RoutesMap } from "@/AppRoutes";

interface Props {
  plantname: string;
  total: number;
}

const FollowingModal: FC<Props> = ({ plantname, total }) => {
  const token = usePlant().get("token").unwrapUndef();
  const { data: following, isLoading } = useFollowing({ plantname, token });

  if (!token || total < 1)
    return <StatLabel total={total} label="Following" div />;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="link link-hover">
        {total} <span className="text-60">Following</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box flex flex-col max-h-[60vh]">
            <div className="flex flex-row items-center justify-between mb-4 -mt-1">
              <h3 className="font-bold text-lg">Following ({total})</h3>
              <Dialog.Close className="btn btn-sm btn-circle btn-ghost -mt-2">
                ✕
              </Dialog.Close>
            </div>
            <Loading
              div
              on={isLoading}
              className="flex flex-col gap-2 min-h-0 overflow-auto"
            >
              {following.map((plant) => (
                <FollowingItem plant={plant} key={plant.id} />
              ))}
            </Loading>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const FollowingItem: FC<{ plant: Followee }> = ({ plant }) => (
  <Link
    className="btn-ghost rounded-btn flex flex-row gap-4 items-center"
    to={"/" + RoutesMap.PROFILE.path.replace(/:.*/, plant.plantname)}
  >
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content text-sm md:text-md xl:text-xl rounded-full w-12 xl:w-16">
        {toAvatar(plant.name)}
      </div>
    </div>
    <div className="flex flex-col grow">
      <p className="md:text-xl xl:text-2xl truncate">{plant.name}</p>
      <p className="text-xs md:text-sm xl:text-lg text-60">
        @{plant.plantname}
      </p>
    </div>
  </Link>
);

export default FollowingModal;
