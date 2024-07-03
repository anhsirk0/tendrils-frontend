import { FC, useMemo } from "react";

// local imports
import { Loading } from "@/components";
import { infiniteScroll } from "@/helpers";
import { useFollowing } from "@/pages/Home/helpers";
import FollowItem from "@/pages/Home/FollowingList/FollowItem";
import ModalRoot from "./ModalRoot";

type Props = { plantname: string; total: number };

const FollowingList: FC<Pick<Plant, "plantname" | "token">> = ({
  plantname,
  token,
}) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFollowing({ plantname, token });
  const following = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  );

  return (
    <Loading
      div
      on={isLoading}
      className="flex flex-col min-h-0 overflow-auto"
      {...(hasNextPage && { onScroll: infiniteScroll(fetchNextPage) })}
    >
      {following.map((plant) => (
        <FollowItem followee={plant} key={plant.id} />
      ))}
      <Loading div on={isFetchingNextPage} className="center" />
    </Loading>
  );
};

const FollowingModal: FC<Props> = ({ plantname, total }) => (
  <ModalRoot
    label="Following"
    total={total}
    renderContent={(token) => (
      <FollowingList plantname={plantname} token={token} />
    )}
  />
);

export default FollowingModal;
