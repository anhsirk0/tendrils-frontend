import { FC, Fragment } from "react";

import { Loading } from "@/components";
import { usePlant } from "@/hooks";
import { useFollowing } from "../helpers";

const FollowingList: FC = () => {
  const plant = usePlant().unwrap();
  const { data: following, isLoading } = useFollowing(plant);

  return (
    <Fragment>
      <p className="text-md">Following ({following.length})</p>
      <Loading div on={isLoading} className="join join-vertical min-h-0 grow">
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
