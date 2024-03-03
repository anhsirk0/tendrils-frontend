import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { Loading } from "@/components";
import Navbar from "./Navbar";

const Home = () => {
  const plant = useAuthStore((state) => state.plant);

  if (!plant.uuid) return <Navigate to="signin" />;
  return (
    <div className="px-8 w-full h-full">
      <Navbar />
      <div className="text-7xl">This is home</div>
      <Loading on={false} />
    </div>
  );
};

export default Home;
