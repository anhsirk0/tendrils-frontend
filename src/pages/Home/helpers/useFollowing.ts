import { useQuery } from "@tanstack/react-query";

import { FollowService } from "@/services";
import { Some } from "@/helpers";
import { toFollowee } from "./";

interface Params {
  plantname: Plant["plantname"];
  token?: Plant["token"];
}

function useFollowing(params: Params) {
  async function getFollowing() {
    const resp = await FollowService.getFollowing(params);
    return Some.Array(resp?.data?.data?.following).map(toFollowee);
  }

  return useQuery({
    queryKey: ["getFollowing", params.plantname],
    queryFn: getFollowing,
    /* select: (data) => data.map(toFollowee), */
    refetchOnWindowFocus: false,
    enabled: !!params.token,
    initialData: [],
  });
}

export default useFollowing;
