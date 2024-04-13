import { FC } from "react";

// icons imports
import { IconHeart, IconMessage } from "@tabler/icons-react";

// other imports
import { format } from "date-fns";
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
          <pre className="line-clamp-6">{tendril.content}</pre>
          <div className="card-actions gap-4 mt-auto">
            <div className="flex gap-4 items-center">
              <button className="active:scale-150 transition">
                <IconHeart className="text-base-content" size={32} />
              </button>
              <p className="text-base-content text-2xl font-medium">
                {tendril.curls.length}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <button className="active:scale-150 transition">
                <IconMessage className="text-base-content" size={32} />
              </button>
              <p className="text-base-content text-2xl font-medium">
                {tendril.commentsCount}
              </p>
            </div>
            <div className="grow" />
            <span className="text-sm md:text-md 2xl:text-xl">
              {format(tendril.createdAt, "dd-MM-yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TendrilsList;
