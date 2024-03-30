import { FC, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import { FollowService } from "@/services";
import { Loading } from "@/components";
import { usePlant } from "@/hooks";
import { Some } from "@/helpers";
import { toFollowee } from "../helpers";

const FollowingList: FC = () => {
  const plant = usePlant().unwrap();

  async function getFollowing() {
    const resp = await FollowService.getFollowing(plant);
    return Some.Array(resp?.data?.data?.following).map(toFollowee);
  }

  const { data: following, isLoading } = useQuery({
    queryKey: ["getFollowing", plant.plantname],
    queryFn: getFollowing,
    /* select: (data) => data.map(toFollowee), */
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return (
    <Fragment>
      <p className="text-md">Following ({following.length})</p>
      <Loading
        on={isLoading}
        component="div"
        className="join join-vertical min-h-0 grow"
      >
        {following.map((f) => (
          <button key={f.id} className="btn join-item">
            {f.name} ({f.plantname})
          </button>
        ))}
      </Loading>
    </Fragment>
  );
};

export default FollowingList;
