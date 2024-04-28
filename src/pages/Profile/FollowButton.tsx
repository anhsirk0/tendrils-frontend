import { FC } from "react";

// other imports
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// local imports
import { FollowService } from "@/services";
import { Loading } from "@/components";
import { useApi, usePlant } from "@/hooks";
import { PlantProfile } from ".";

interface Props {
  info: Pick<Plant, "plantname" | "name"> &
    Pick<PlantProfile, "isFollowed" | "isMe">;
}

const FollowButton: FC<Props> = ({ info }) => {
  return info.isMe ? <YouBadge /> : <ButtonForFollow info={info} />;
};

const ButtonForFollow: FC<Props> = ({ info }) => {
  const token = usePlant().get("token").unwrapUndef();
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
    <Loading
      on={isPending}
      component="button"
      className={clsx(
        "btn btn-sm 2xl:btn-md btn-primary capitalize",
        info.isFollowed && "btn-outline"
      )}
      onClick={(e) => (e.stopPropagation(), mutate())}
      disabled={isPending}
    >
      {info.isFollowed && "un"}follow
    </Loading>
  );
};

const YouBadge: FC = () => (
  <div className="badge badge-primary 2xl:badge-xl">You</div>
);

export default FollowButton;
