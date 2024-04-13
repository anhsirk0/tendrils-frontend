import { FC } from "react";

interface Props {
  uuid: string;
}

const FeedInfo: FC<Props> = ({ uuid }) => {
  return <p className="text-xl grow-0">{uuid}</p>;
};

export default FeedInfo;
