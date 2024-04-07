import { useMediaQuery } from "@/hooks";
import FollowingList from "./FollowingList";
import Feed from "./Feed";

const Home = () => {
  const isLg = useMediaQuery("lg");

  return (
    <div className="p-4 grid grid-cols-9 lg:grid-cols-12 gap-4 grow">
      {isLg && (
        <div className="col-span-2 flex flex-col border-r border-r-base-content/30 px-4">
          <FollowingList />
        </div>
      )}
      <div className="col-span-9 lg:col-span-6">
        <Feed />
      </div>
      {isLg && <div className="col-span-4">Extra</div>}
    </div>
  );
};

export default Home;
