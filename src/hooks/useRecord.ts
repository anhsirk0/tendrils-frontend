import { useState } from "react";

function useRecord<T extends Record<string, any>>(initialInfo: T) {
  const [info, setInfo] = useState<T>(initialInfo);

  function updateInfo<K extends keyof T>(key: K, value: T[K]) {
    setInfo((prevInfo) => ({ ...prevInfo, [key]: value }));
  }

  return [info, updateInfo, setInfo] as const;
}

export default useRecord;
