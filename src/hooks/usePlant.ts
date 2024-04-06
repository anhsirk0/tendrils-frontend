import { useAuthStore } from "@/store";
import { Maybe, toMaybe } from "@/helpers";

function usePlant(): Maybe<Plant> {
  const { plant } = useAuthStore();
  return toMaybe(plant).run((p) => (p.token.length < 34 ? null : p));
}

export default usePlant;
