import { useState, useEffect } from "react";
import { BreakpointKey, breakpoints } from "@/config";

function useMediaQuery(query: BreakpointKey) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoints[query]})`);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;
