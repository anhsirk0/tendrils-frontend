import { FC } from "react";

// other imports
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { TendrilService } from "@/services";
import { RoutesMap } from "@/AppRoutes";
import { usePlant } from "@/hooks";
import { toProfileLink, toAvatar } from "@/helpers";
import { FeedTendril } from "@/pages/Home/types";
import { toFeedTendril } from "@/pages/Home/helpers";

const TendrilPage = () => {
  const { uuid } = useParams();
  const token = usePlant().get("token").unwrapUndef();

  async function getTendril() {
    const resp = await TendrilService.get({ uuid, token });
    return toFeedTendril(resp?.data?.data);
  }

  const { data: tendril, isLoading } = useQuery({
    queryKey: ["getTendril", uuid],
    queryFn: getTendril,
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  });

  console.log(tendril);

  if (!uuid) return <Navigate to={RoutesMap.HOME.path} />;

  return (
    <Loading div on={isLoading} className="center h-full w-full p-4">
      {tendril ? (
        <div className="flex flex-col h-full w-full scroll-smooth max-w-7xl">
          <div className="flex w-full justify-between items-end">
            <div className="text-7xl">{tendril.title}</div>
            <AuthorInfo {...tendril.author} />
          </div>
        </div>
      ) : (
        <div className="text-7xl text-center">Tendril not found</div>
      )}
    </Loading>
  );
};

const AuthorInfo: FC<FeedTendril["author"]> = ({ plantname, name }) => (
  <Link
    to={toProfileLink(plantname)}
    onClick={(e) => e.stopPropagation()}
    className="flex items-center btn-ghost rounded-btn p-1 2xl:p-2"
  >
    <p className="truncate text-lg md:text-xl 2xl:text-3xl">{name}</p>
    <div className="avatar placeholder pl-2">
      <div className="bg-neutral text-neutral-content md:text-lg 2xl:text-2xl rounded-btn w-10 2xl:w-12">
        {toAvatar(name)}
      </div>
    </div>
  </Link>
);
export default TendrilPage;
