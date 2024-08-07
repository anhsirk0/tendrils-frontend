import { FC } from "react";

// other imports
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// local imports
import { FollowService } from "@/services";
import { Button } from "@/components";
import { useApi, usePlant } from "@/hooks";
import { PlantProfile } from "../types";

interface Props {
  info: Pick<Plant, "plantname" | "name"> &
    Pick<PlantProfile, "isFollowed" | "isMe">;
}

const FollowButton: FC<Props> = ({ info }) =>
  info.isMe ? <YouBadge /> : <ButtonForFollow info={info} />;

const ButtonForFollow: FC<Props> = ({ info }) => {
  const token = usePlant().prop("token").getUndef();
  const client = useQueryClient();

  const { mutate, isPending } = useApi({
    fn: () => FollowService.toggle({ plantname: info.plantname, token }),
    onSuccess: () => {
      toast.success(
        (info.isFollowed ? "Unf" : "F") + `ollowed '${info.name}' successfully`
      );
      client.invalidateQueries({ queryKey: ["getProfile"] });
      client.invalidateQueries({ queryKey: ["getFollowing"] });
      client.invalidateQueries({ queryKey: ["getFollowers"] });
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <Button
      loading={isPending}
      className={clsx(
        "btn btn-sm 2xl:btn-md btn-primary capitalize",
        info.isFollowed && "btn-outline"
      )}
      onClick={(e) => (e.stopPropagation(), mutate())}
    >
      {info.isFollowed ? "unfollow" : "follow"}
    </Button>
  );
};

const YouBadge: FC = () => (
  <div className="center bg-neutral text-neutral-content px-4 py-2 rounded-btn text-sm md:text-md">
    You
  </div>
);

export default FollowButton;
