import { FC } from "react";

// local imports
import { Loading } from "@/components";
import { useFollowers } from "@/pages/Home/helpers";
import FollowItem from "@/pages/Home/FollowingList/FollowItem";
import ModalRoot from "./ModalRoot";

type Props = { plantname: string; total: number };

const FollowersList: FC<Pick<Plant, "plantname" | "token">> = ({
  plantname,
  token,
}) => {
  const { data: followers, isLoading } = useFollowers({ plantname, token });
  return (
    <Loading div on={isLoading} className="flex flex-col min-h-0 overflow-auto">
      {followers.map((plant) => (
        <FollowItem followee={plant} key={plant.id} />
      ))}
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
