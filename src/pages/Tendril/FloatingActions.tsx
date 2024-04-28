// icons imports
import { IconMessage, IconArrowUp } from "@tabler/icons-react";
import { toMaybe } from "@/helpers";

const FloatingActions = () => {
  function scrollTop() {
    toMaybe(document.getElementById("tendril-container")).run((el) =>
      el.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  function scrollToComments() {
    toMaybe(document.getElementById("tendril-comments")).run((el) =>
      el.scrollIntoView({ behavior: "smooth" })
    );
  }

  return (
    <div className="fixed bottom-2 right-4 2xl:bottom-6 2xl:right-8">
      <div className="flex gap-4 items-center">
        <div className="tooltip tooltip-primary" data-tip="Go to Comments">
          <button
            className="btn btn-primary btn-sm 2xl:btn-md"
            onClick={scrollToComments}
          >
            <IconMessage />
          </button>
        </div>
        <div className="tooltip tooltip-primary" data-tip="Go to Top">
          <button
            className="btn btn-primary btn-sm 2xl:btn-md"
            onClick={scrollTop}
          >
            <IconArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActions;
