import { FC, Fragment } from "react";

// other imports
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some } from "@/helpers";
import FollowItem from "@/pages/Home/FollowingList/FollowItem";
import { toFollowee } from "@/pages/Home/helpers";
import { PlantService } from "@/services";

const PopularPlants: FC = () => {
  async function getPopular() {
    const resp = await PlantService.getPopular();
    return Some.Array(resp?.data?.data);
  }

  const { data: popularPlants, isLoading } = useQuery({
    queryKey: ["getPopular"],
    queryFn: getPopular,
    refetchOnWindowFocus: false,
    select: (data) => data.map(toFollowee),
    initialData: [],
  });

  return (
    <Fragment>
      <p className="text-md pb-4">Popular Plants</p>
      <Loading
        div
        on={isLoading}
        className="flex flex-col min-h-0 overflow-auto"
      >
        {popularPlants.map((plant) => (
          <FollowItem followee={plant} key={plant.id} compact />
        ))}
      </Loading>
    </Fragment>
  );
};

export default PopularPlants;
