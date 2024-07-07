import { FC } from "react";

// other imports
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some } from "@/helpers";
import FeedItem from "@/pages/Home/Feed/FeedItem";
import { toFeedTendril } from "@/pages/Home/helpers";
import { TendrilService } from "@/services";

const PopularTendrils: FC = () => {
  async function getPopular() {
    const resp = await TendrilService.getPopular();
    return Some.Array(resp?.data?.data);
  }

  const { data: popularTendrils, isLoading } = useQuery({
    queryKey: ["getPopularTendrils"],
    queryFn: getPopular,
    refetchOnWindowFocus: false,
    select: (data) => data.map(toFeedTendril),
    initialData: [],
  });

  return (
    <div className="col-span-9 lg:col-span-7 h-full min-h-0 flex flex-col">
      <p className="text-md pb-4">Popular Tendrils</p>
      <Loading
        div
        on={isLoading}
        className="flex flex-col gap-4 min-h-0 h-full md:pr-4 grow overflow-y-auto"
      >
        {popularTendrils.map((tendril) => (
          <FeedItem tendril={tendril} key={tendril.id} />
        ))}
      </Loading>
    </div>
  );
};

export default PopularTendrils;
