import { FC, Fragment, ReactElement, useState } from "react";

// other imports
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// local imports
import { usePlant } from "@/hooks";
import StatLabel from "../StatLabel";

type Props = {
  label: string;
  total: number;
  renderContent: Fn1<string, ReactElement>;
};

const ModalRoot: FC<Props> = ({ label, total, renderContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = usePlant().get("token").unwrapUndef();
  if (!token || total < 1) return <StatLabel total={total} label={label} div />;

  return (
    <Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className="link link-hover text-left"
      >
        <StatLabel total={total} label={label} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="modal modal-open modal-bottom sm:modal-middle"
      >
        <DialogPanel className="modal-box flex flex-col max-h-[60vh]">
          <div className="flex flex-row items-center justify-between mb-4 -mt-1">
            <DialogTitle className="font-bold text-lg">
              {label} ({total})
            </DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle btn-ghost -mt-2"
            >
              ✕
            </button>
          </div>
          {renderContent(token)}
        </DialogPanel>
      </Dialog>
    </Fragment>
  );
};

export default ModalRoot;
