import { useEffect, useState } from "react";
import { toTitleCase } from "@/helpers";

function toPageTitle(title: string = "", secondTitle: string = ""): string {
  const sep: string = " • ";
  secondTitle = secondTitle ? sep + secondTitle : "";
  return title
    ? toTitleCase(`${title}${secondTitle}`) + sep + "Tendrils"
    : "Tendrils";
}

const usePageTitle = (...args: Parameters<typeof toPageTitle>) => {
  const [pageTitle, setPageTitle] = useState<string>(toPageTitle(...args));

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return {
    title: pageTitle,
    setTitle: (...args: Parameters<typeof toPageTitle>) =>
      setPageTitle(toPageTitle(...args)),
  };
};

export default usePageTitle;
