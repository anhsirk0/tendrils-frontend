import { useQuery } from "@tanstack/react-query";

import { FollowService } from "@/services";
import { Some } from "@/helpers";
import { toFollowee } from "./";

interface Params {
  plantname: Plant["plantname"];
  token?: Plant["token"];
}

function useFollowers(params: Params) {
  async function getFollowers() {
    const resp = await FollowService.getFollowers(params);
    return Some.Array(resp?.data?.data?.followers).map(toFollowee);
  }

  return useQuery({
    queryKey: ["getFollowers", params.plantname],
    queryFn: getFollowers,
    /* select: (data) => data.map(toFollowee), */
    refetchOnWindowFocus: false,
    enabled: !!params.token,
    initialData: [],
  });
}

export default useFollowers;
