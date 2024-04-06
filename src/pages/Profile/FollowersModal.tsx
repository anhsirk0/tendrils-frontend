import { FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  plantname: string;
  total: number;
}

const FollowersModal: FC<Props> = ({ plantname, total }) => {
  console.log(plantname);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="link link-hover">
        {total} <span className="text-60">Followers</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="modal modal-open">
          <div className="modal-box">
            <Dialog.Close className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </Dialog.Close>
            <h3 className="font-bold text-lg">Followers</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FollowersModal;
