import { pick } from "@/helpers";
import { Plant, useAuthStore } from "@/store";

function useCreds<K extends keyof Plant>(...keys: Array<K>): Pick<Plant, K> {
  const { plant } = useAuthStore();
  let p: Pick<Plant, K> = plant;
  if (keys.length > 0) {
    p = pick(p, ...keys);
  }
  return p;
}

export default useCreds;
