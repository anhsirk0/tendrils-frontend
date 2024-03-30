import { FC, Fragment } from "react";

import { useQuery } from "@tanstack/react-query";

// local imports
import { Some } from "@/helpers";
import { Loading } from "@/components";
import { TendrilService } from "@/services";
import { usePlant } from "@/hooks";
import { toTendril } from "../helpers";
import { TendrilItem } from "@/pages/Profile/TendrilsList";

const Feed: FC = () => {
  const token = usePlant().unwrap().token;

  async function getFeed() {
    const resp = await TendrilService.getFeed({ token });
    return Some.Array(resp?.data?.data?.data).map(toTendril);
  }
  const { data: tendrils, isLoading } = useQuery({
    queryKey: ["getFeed", token],
    queryFn: getFeed,
    refetchOnWindowFocus: false,
    enabled: !!token,
    initialData: [],
  });

  return (
    <Fragment>
      <p className="text-md">Feed</p>
      <Loading
        on={isLoading}
        component="div"
        className="flex  flex-col [&>*]:w-full"
      >
        {tendrils.map((tendril) => (
          <TendrilItem tendril={tendril} key={tendril.id} />
        ))}
      </Loading>
    </Fragment>
  );
};

export default Feed;
