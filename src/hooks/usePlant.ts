import { useAuthStore } from "@/store";

function usePlant() {
  const { plant } = useAuthStore();
  return plant;
}

export default usePlant;
