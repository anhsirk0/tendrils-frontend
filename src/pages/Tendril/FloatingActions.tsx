import { FC, ReactNode } from "react";
// icons imports
import { IconMessage, IconArrowUp } from "@tabler/icons-react";
import { getElementMaybe } from "@/helpers";
import { useResponsive } from "@/hooks";

const FloatingActions: FC<{ children?: ReactNode }> = ({ children }) => {
  const R = useResponsive();

  function scrollTop() {
    getElementMaybe("tendril-container").run((el) =>
      el.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  function scrollToComments() {
    getElementMaybe("tendril-comments").run((el) =>
      el.scrollIntoView({ behavior: "smooth" })
    );
  }

  return (
    <div className="fixed bottom-2 right-4 2xl:bottom-6 2xl:right-8">
      <div className="flex gap-4 items-center">
        {children}
        <div className="tooltip tooltip-primary" data-tip="Go to Comments">
          <button
            className="btn btn-primary btn-sm 2xl:btn-md"
            onClick={scrollToComments}
          >
            <IconMessage size={R({ base: 20, lg: 24, "2xl": 28 })} />
          </button>
        </div>
        <div className="tooltip tooltip-primary" data-tip="Go to Top">
          <button
            className="btn btn-primary btn-sm 2xl:btn-md"
            onClick={scrollTop}
          >
            <IconArrowUp size={R({ base: 20, lg: 24, "2xl": 28 })} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActions;
