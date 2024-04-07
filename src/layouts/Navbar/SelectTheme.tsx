import { useEffect } from "react";

import { IconColorSwatch } from "@tabler/icons-react";
import { themeChange } from "theme-change";
import { themes } from "@/config";

const SelectTheme = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div className="hidden" data-set-theme="" data-key="tendrils-theme" />
      <label
        tabIndex={0}
        className="btn btn-sm 2xl:btn-md 2xl:px-3 btn-ghost font-normal"
      >
        <IconColorSwatch className="text-accent" />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] flex flex-col gap-2 p-4 bg-neutral rounded-box h-80 min-h-0 overflow-y-auto mb-4 w-52 shadow-xl"
      >
        {themes.map((theme) => (
          <div
            key={theme}
            className="btn h-10 justify-between rounded-xl w-full"
            data-key="tendrils-theme"
            data-theme={theme}
            data-set-theme={theme}
          >
            {theme}
            <div className="flex flex-row gap-1 [&>div]:h-6 [&>div]:w-2 [&>div]:rounded-xl">
              <div className="bg-primary" />
              <div className="bg-accent" />
              <div className="bg-secondary" />
              <div className="bg-neutral" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTheme;
