import { useMediaQuery } from "@/hooks";
import FollowingList from "./FollowingList";
import Feed from "./Feed";

const Home = () => {
  const isLg = useMediaQuery("lg");

  return (
    <div className="p-4 grid grid-cols-9 lg:grid-cols-12 gap-4 min-h-0 h-full">
      {isLg && (
        <div className="col-span-2 flex flex-col border-r border-r-base-content/30 px-4 h-full">
          <FollowingList />
        </div>
      )}
      <Feed />
      {isLg && <div className="col-span-3" />}
    </div>
  );
};

export default Home;
