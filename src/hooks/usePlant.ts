import { useAuthStore } from "@/store";
import { Maybe } from "@/helpers";

function usePlant(): Maybe<Plant> {
  const { plant } = useAuthStore();
  return new Maybe(plant && plant.token.length > 34 ? plant : null);
}

export default usePlant;
