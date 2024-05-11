import { FC, UIEvent } from "react";

// other imports
import { useInfiniteQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some } from "@/helpers";
import { usePlant } from "@/hooks";
import { TendrilService } from "@/services";
import { toFeedTendril } from "../helpers";
import FeedItem from "./FeedItem";

const Feed: FC = () => {
  const token = usePlant().unwrap().token;

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

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 0.8) fetchNextPage();
  }

  return (
    <div className="col-span-9 lg:col-span-7 h-full min-h-0 flex flex-col">
      <p className="text-md pb-4">Feed</p>
      <Loading
        div
        on={isLoading}
        className="flex flex-col gap-4 min-h-0 h-full md:pr-4 grow overflow-y-auto"
        {...(hasNextPage && { onScroll })}
      >
        {data?.pages
          .flatMap((page) => page.data)
          .map((tendril) => <FeedItem tendril={tendril} key={tendril.id} />)}
        {data?.pages.length === 0 && (
          <div className="center">
            <p className="text-5xl text-40 text-center font-medium">
              Tendrils from people you follow will appear here
            </p>
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
