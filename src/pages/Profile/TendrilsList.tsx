import { FC } from "react";

// other imports
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some } from "@/helpers";
import { usePlant } from "@/hooks";
import { toTendril } from "@/pages/Home/helpers";
import { Tendril } from "@/pages/Home/types";
import { TendrilService } from "@/services";

interface Props {
  plantname: string;
  total: number;
}

const TendrilsList: FC<Props> = ({ plantname, total }) => {
  const token = usePlant().get("token").unwrapUndef();

  async function getTendrils() {
    const resp = await TendrilService.getAll({ plantname, token });
    return Some.Array(resp?.data?.data?.data).map(toTendril);
  }
  const { data: tendrils, isLoading } = useQuery({
    queryKey: ["getTendrils", token],
    queryFn: getTendrils,
    refetchOnWindowFocus: false,
    enabled: !!token,
    initialData: [],
  });

  return (
    <Loading div on={isLoading} className="flex flex-col gap-4" id="tendrils">
      <p className="text-base-content">Tendrils ({total})</p>
      <div className="grid grid-cols-12 gap-4 2xl:gap-12">
        {tendrils.map((tendril) => (
          <TendrilItem tendril={tendril} key={tendril.id} />
        ))}
      </div>
    </Loading>
  );
};

interface TendrilItemProps {
  tendril: Tendril;
}

const TendrilItem: FC<TendrilItemProps> = ({ tendril }) => {
  return (
    <div className="col-span-12 md:col-span-6">
      <div className="card bg-base-100 border border-neutral rounded-btn h-80">
        <div className="card-body">
          <h2 className="card-title">{tendril.title}</h2>
          <p className="line-clamp-4">{tendril.content}</p>
        </div>
      </div>
    </div>
  );
};

export default TendrilsList;
