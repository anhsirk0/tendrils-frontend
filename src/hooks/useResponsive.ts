import { useMediaQuery } from "@/hooks";

function useResponsive() {
  const isLg = useMediaQuery("lg");
  const is2xl = useMediaQuery("2xl");

  function R<T>(styles: { base: T; lg: T; "2xl": T }) {
    return is2xl ? styles["2xl"] : isLg ? styles.lg : styles.base;
  }

  return R;
}

export default useResponsive;
