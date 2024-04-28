import { FC, Fragment } from "react";

import { Loading } from "@/components";
import { usePlant } from "@/hooks";
import { useFollowing } from "../helpers";
import FollowItem from "./FollowItem";

const FollowingList: FC = () => {
  const plant = usePlant().unwrap();
  const { data: following, isLoading } = useFollowing(plant);

  return (
    <Fragment>
      <p className="text-md pb-4">Following ({following.length})</p>
      <Loading
        div
        on={isLoading}
        className="flex flex-col min-h-0 overflow-auto"
      >
        {following.map((plant) => (
          <FollowItem followee={plant} key={plant.id} compact />
        ))}
      </Loading>
    </Fragment>
  );
};

export default FollowingList;
