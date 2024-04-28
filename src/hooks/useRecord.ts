import { useState } from "react";

export type UpdateRecordFn<T, K extends keyof T = keyof T> = (
  key: K,
  value: T[K]
) => void;

function useRecord<T extends Record<string, any>>(initialInfo: T) {
  const [info, setInfo] = useState<T>(initialInfo);

  const updateInfo: UpdateRecordFn<T> = (key, value) =>
    setInfo((prevInfo) => ({ ...prevInfo, [key]: value }));

  return [info, updateInfo, setInfo] as const;
}

export default useRecord;
