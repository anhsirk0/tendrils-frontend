import { useMediaQuery, usePageTitle } from "@/hooks";
import { RoutesMap } from "@/AppRoutes";
import PopularPlants from "./PopularPlants";
import PopularTendrils from "./PopularTendrils";

const Explore = () => {
  usePageTitle(RoutesMap.EXPLORE.title);
  const isLg = useMediaQuery("lg");

  return (
    <div className="p-4 grid grid-cols-9 lg:grid-cols-12 gap-4 min-h-0 h-full">
      {isLg && (
        <div className="col-span-2 flex flex-col border-r border-r-base-content/30 px-4 h-full">
          <PopularPlants />
        </div>
      )}
      <PopularTendrils />
      {isLg && <div className="col-span-3" />}
    </div>
  );
};

export default Explore;
