import { FC } from "react";

// other imports
import * as Dialog from "@radix-ui/react-dialog";

// local imports
import { Loading } from "@/components";
import { usePlant } from "@/hooks";
import { useFollowing } from "@/pages/Home/helpers";
import FollowItem from "@/pages/Home/FollowingList/FollowItem";
import Label from "./StatLabel";

type Props = { plantname: string; total: number };
type ModalProps = Props & { token: string };

const FollowingLabel: FC<Props> = ({ plantname, total }) => {
  const token = usePlant().get("token").unwrapUndef();
  if (!token || total < 1) return <Label total={total} label="Following" div />;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="link link-hover">
        <Label total={total} label="Following" />
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
            <FollowingList plantname={plantname} token={token} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const FollowingList: FC<Omit<ModalProps, "total">> = ({ plantname, token }) => {
  const { data: following, isLoading } = useFollowing({ plantname, token });
  return (
    <Loading div on={isLoading} className="flex flex-col min-h-0 overflow-auto">
      {following.map((plant) => (
        <FollowItem followee={plant} key={plant.id} />
      ))}
    </Loading>
  );
};

export default FollowingLabel;
