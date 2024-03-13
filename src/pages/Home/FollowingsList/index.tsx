import { FC, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import { PlantService } from "@/services";
import { Loading } from "@/components";
import { useCreds } from "@/hooks";
import { Some } from "@/helpers";

type Followee = { id: number; name: string; plantname: string };

function toFollowee(p: BackendData): Followee {
  return {
    id: Some.Number(p?.id),
    name: Some.String(p?.name),
    plantname: Some.String(p?.plantname),
  };
}

const FollowingsList: FC = () => {
  const plant = useCreds();

  async function getFollowings() {
    const resp = await PlantService.getFollowings(plant);
    return Some.Array(resp?.data?.data?.followings).map(toFollowee);
  }

  const { data: followings, isLoading } = useQuery({
    queryKey: ["getFollowings", plant.plantname],
    queryFn: getFollowings,
    /* select: (data) => data.map(toFollowee), */
    refetchOnWindowFocus: false,
    initialData: [],
  });

  return (
    <Fragment>
      <p className="text-md">Followings ({followings.length})</p>
      <Loading
        on={isLoading}
        component="div"
        className="join join-vertical min-h-0 grow"
      >
        {followings.map((f) => (
          <button key={f.id} className="btn join-item">
            {f.name} ({f.plantname})
          </button>
        ))}
      </Loading>
    </Fragment>
  );
};

export default FollowingsList;
