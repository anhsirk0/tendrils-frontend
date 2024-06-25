import { FC, ReactElement } from "react";

// other imports
import * as Dialog from "@radix-ui/react-dialog";

// local imports
import { usePlant } from "@/hooks";
import Label from "../StatLabel";

type Props = {
  label: string;
  total: number;
  renderContent: Fn1<string, ReactElement>;
};

const ModalRoot: FC<Props> = ({ label, total, renderContent }) => {
  const token = usePlant().get("token").unwrapUndef();
  if (!token || total < 1) return <Label total={total} label={label} div />;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="link link-hover text-left">
        <Label total={total} label={label} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box flex flex-col max-h-[60vh]">
            <div className="flex flex-row items-center justify-between mb-4 -mt-1">
              <h3 className="font-bold text-lg">
                {label} ({total})
              </h3>
              <Dialog.Close className="btn btn-sm btn-circle btn-ghost -mt-2">
                ✕
              </Dialog.Close>
            </div>
            {renderContent(token)}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalRoot;
