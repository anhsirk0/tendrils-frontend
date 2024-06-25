import { FC } from "react";

// local imports
import { Loading } from "@/components";
import { useFollowing } from "@/pages/Home/helpers";
import FollowItem from "@/pages/Home/FollowingList/FollowItem";
import ModalRoot from "./ModalRoot";

type Props = { plantname: string; total: number };

const FollowingList: FC<Pick<Plant, "plantname" | "token">> = ({
  plantname,
  token,
}) => {
  const { data: following, isLoading } = useFollowing({ plantname, token });
  return (
    <Loading div on={isLoading} className="flex flex-col min-h-0 overflow-auto">
      {following.map((plant) => (
        <FollowItem followee={plant} key={plant.id} />
      ))}
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
