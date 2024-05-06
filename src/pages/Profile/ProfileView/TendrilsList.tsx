import { FC } from "react";

// other imports
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some } from "@/helpers";
import { usePlant } from "@/hooks";
import { toTendril } from "@/pages/Home/helpers";
import { TendrilService } from "@/services";
import FeedItem from "@/pages/Home/Feed/FeedItem";

interface Props {
  plant: Pick<Plant, "plantname" | "name" | "avatarUrl">;
  total: number;
}

const TendrilsList: FC<Props> = ({ plant, total }) => {
  const token = usePlant().get("token").unwrapUndef();

  async function getTendrils() {
    const resp = await TendrilService.getAll({
      plantname: plant.plantname,
      token,
    });
    return Some.Array(resp?.data?.data?.data).map(toTendril);
  }
  const { data: tendrils, isLoading } = useQuery({
    queryKey: ["getTendrils", token],
    queryFn: getTendrils,
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return (
    <Loading div on={isLoading} className="flex flex-col gap-4" id="tendrils">
      <p className="text-base-content">Tendrils ({total})</p>
      <div className="grid grid-cols-12 gap-4 2xl:gap-12">
        {tendrils.map((tendril) => (
          <div
            className="col-span-12 md:col-span-6 [&>div]:h-60 [&>div]:2xl:h-80"
            key={tendril.id}
          >
            <FeedItem tendril={{ ...tendril, author: plant }} compact />
          </div>
        ))}
      </div>
    </Loading>
  );
};

export default TendrilsList;
