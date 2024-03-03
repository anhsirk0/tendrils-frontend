export type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";
export type Breakpoints = Record<BreakpointKey, string>;

const breakpoints: Breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export default breakpoints;
