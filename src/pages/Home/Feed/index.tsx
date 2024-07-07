import { FC, useMemo } from "react";

// other imports
import { NavLink } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { clsx } from "clsx";

// local imports
import { Loading } from "@/components";
import { Some, infiniteScroll } from "@/helpers";
import { usePlant } from "@/hooks";
import { TendrilService } from "@/services";
import { RoutesMap } from "@/AppRoutes";
import { toFeedTendril } from "../helpers";
import FeedItem from "./FeedItem";

const Feed: FC = () => {
  const token = usePlant().get().token;

  async function fetchFeed({ pageParam = 0 }: { pageParam: number }) {
    const resp = await TendrilService.getFeed({ token, page: pageParam });
    const data = Some.Object(resp?.data?.data);
    const hasNextPage =
      pageParam * TendrilService.TAKE + Some.Number(data.pageTotal) <=
      Some.Number(data.total);
    return {
      data: Some.Array(data?.data).map(toFeedTendril),
      nextCursor: hasNextPage ? pageParam + 1 : undefined,
    };
  }

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["getFeed", token],
      queryFn: fetchFeed,
      refetchOnWindowFocus: false,
      enabled: !!token,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const tendrils = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  );

  return (
    <div className="col-span-9 lg:col-span-7 h-full min-h-0 flex flex-col">
      <p className="text-md pb-4">Feed</p>
      <Loading
        div
        on={isLoading}
        className={clsx(
          "flex flex-col gap-4 min-h-0 h-full md:pr-4 grow overflow-y-auto",
          isLoading && "center"
        )}
        {...(hasNextPage && { onScroll: infiniteScroll(fetchNextPage) })}
      >
        {tendrils.map((tendril) => (
          <FeedItem tendril={tendril} key={tendril.id} />
        ))}
        {tendrils.length === 0 && (
          <div className="center flex-col h-1/2">
            <p className="text-lg md:text-xl 2xl:text-2xl text-40 text-center font-medium">
              Tendrils from people you follow will appear here
            </p>
            <div className="divider px-16" />
            <NavLink
              to={RoutesMap.EXPLORE.path}
              className="btn btn-outline btn-primary"
            >
              Explore
            </NavLink>
          </div>
        )}
        <Loading div on={isFetchingNextPage} className="center text-60">
          {!hasNextPage && "You've reached the end"}
        </Loading>
      </Loading>
    </div>
  );
};

export default Feed;
