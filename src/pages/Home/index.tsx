import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store";

const Home = () => {
  const plant = useAuthStore((state) => state.plant);

  if (!plant.uuid) return <Navigate to="signin" />;
  return <div className="text-7xl">This is home</div>;
};

export default Home;
