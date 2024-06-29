import { FC, useMemo } from "react";

// local imports
import { Loading } from "@/components";
import { infiniteScroll } from "@/helpers";
import { useFollowers } from "@/pages/Home/helpers";
import FollowItem from "@/pages/Home/FollowingList/FollowItem";
import ModalRoot from "./ModalRoot";

type Props = { plantname: string; total: number };

const FollowersList: FC<Pick<Plant, "plantname" | "token">> = ({
  plantname,
  token,
}) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFollowers({ plantname, token });
  const followers = useMemo(
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
      {followers.map((plant) => (
        <FollowItem followee={plant} key={plant.id} />
      ))}
      <Loading div on={isFetchingNextPage} className="center text-60">
        {!hasNextPage && "You've reached the end"}
      </Loading>
    </Loading>
  );
};

const FollowersModal: FC<Props> = ({ plantname, total }) => (
  <ModalRoot
    label="Followers"
    total={total}
    renderContent={(token) => (
      <FollowersList plantname={plantname} token={token} />
    )}
  />
);

export default FollowersModal;
