import { useInfiniteQuery } from "@tanstack/react-query";

import { FollowService } from "@/services";
import { Some } from "@/helpers";
import { toFollowee } from "./";

function useFollowers(params: Pick<Plant, "plantname"> & TokenOpt) {
  async function fetchFollowers({ pageParam = 0 }: { pageParam: number }) {
    const resp = await FollowService.getFollowers({
      ...params,
      page: pageParam,
    });
    const data = Some.Object(resp?.data?.data);
    const hasNextPage =
      pageParam * FollowService.TAKE + Some.Number(data.pageTotal) <=
      Some.Number(data.total);
    return {
      data: Some.Array(data?.data).map(toFollowee),
      nextCursor: hasNextPage ? pageParam + 1 : undefined,
    };
  }

  return useInfiniteQuery({
    queryKey: ["getFollowers", params.plantname],
    queryFn: fetchFollowers,
    refetchOnWindowFocus: false,
    enabled: !!params.token,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export default useFollowers;
