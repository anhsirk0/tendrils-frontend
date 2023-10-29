import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { Loading } from "@/components";

const Home = () => {
  const plant = useAuthStore((state) => state.plant);

  if (!plant.uuid) return <Navigate to="signin" />;
  return (
    <div className="container">
      <div className="text-7xl">This is home</div>
      <Loading on={false} />
    </div>
  );
};

export default Home;
