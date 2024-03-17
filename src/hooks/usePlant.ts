import { useAuthStore } from "@/store";
import { Maybe, toMaybe } from "@/helpers";

function usePlant(): Maybe<Plant> {
  const { plant } = useAuthStore();
  return toMaybe(plant);
}

export default usePlant;
