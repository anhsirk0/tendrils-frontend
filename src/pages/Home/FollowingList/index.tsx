import { FC, Fragment, useMemo } from "react";

import { Loading } from "@/components";
import { usePlant } from "@/hooks";
import { infiniteScroll } from "@/helpers";
import { useFollowing } from "../helpers";
import FollowItem from "./FollowItem";

const FollowingList: FC = () => {
  const plant = usePlant().get();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFollowing(plant);
  const following = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  );

  return (
    <Fragment>
      <p className="text-md pb-4">Following ({following.length})</p>
      <Loading
        div
        on={isLoading}
        className="flex flex-col min-h-0 overflow-auto"
        {...(hasNextPage && { onScroll: infiniteScroll(fetchNextPage) })}
      >
        {following.map((plant) => (
          <FollowItem followee={plant} key={plant.id} compact />
        ))}
        <Loading div on={isFetchingNextPage} className="center text-60">
          {!hasNextPage && "You've reached the end"}
        </Loading>
      </Loading>
    </Fragment>
  );
};

export default FollowingList;
