import { useState } from "react";

function useToggle(initialVal: boolean) {
  const [state, setState] = useState(initialVal);

  function toggleState(val?: boolean) {
    setState((p) => (val !== undefined ? val : !p));
  }

  function toggleFn(val: boolean) {
    return () => setState(val);
  }

  return [state, toggleState, toggleFn] as const;
}

export default useToggle;
