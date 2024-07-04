import { FC, useEffect, useMemo, useCallback } from "react";

// other imports
import { useInfiniteQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some, infiniteScroll } from "@/helpers";
import { usePlant } from "@/hooks";
import { toTendril } from "@/pages/Home/helpers";
import { TendrilService } from "@/services";
import FeedItem from "@/pages/Home/Feed/FeedItem";

interface Props {
  plant: Pick<Plant, "plantname" | "name" | "avatarUrl">;
  total: number;
}

const TendrilsList: FC<Props> = ({ plant, total }) => {
  const token = usePlant().prop("token").getUndef();

  async function fetchTendrils({ pageParam = 0 }: { pageParam: number }) {
    const resp = await TendrilService.getAll({
      plantname: plant.plantname,
      token,
      page: pageParam,
    });
    const data = Some.Object(resp?.data?.data);
    const hasNextPage =
      pageParam * TendrilService.TAKE + Some.Number(data.pageTotal) <=
      Some.Number(data.total);
    return {
      data: Some.Array(data?.data).map(toTendril),
      nextCursor: hasNextPage ? pageParam + 1 : undefined,
    };
  }

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["getTendrils", token],
      queryFn: fetchTendrils,
      refetchOnWindowFocus: false,
      /* enabled: !!token, */
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const onScroll = useCallback(
    (e: Event) => {
      if (hasNextPage)
        infiniteScroll(fetchNextPage)({ currentTarget: e.currentTarget! });
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const container = document.getElementById("main");
    container?.addEventListener("scroll", onScroll);
    return () => container?.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const tendrils = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  );

  return (
    <Loading div on={isLoading} className="flex flex-col gap-4 pb-4">
      <p className="text-base-content">Tendrils ({total})</p>
      <div className="grid grid-cols-12 gap-4 2xl:gap-8">
        {tendrils.map((tendril) => (
          <div
            className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-6 [&>div]:h-48 [&>div]:2xl:h-64"
            key={tendril.id}
          >
            <FeedItem tendril={{ ...tendril, author: plant }} compact />
          </div>
        ))}
      </div>
      <Loading div on={isFetchingNextPage} className="center" />
    </Loading>
  );
};

export default TendrilsList;
