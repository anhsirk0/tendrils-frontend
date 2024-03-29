import { FC } from "react";

// other imports
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// local imports
import { FollowService } from "@/services";
import { Loading } from "@/components";
import { useApi, usePlant } from "@/hooks";
import type { PlantProfile } from "./index";

interface Props {
  profile: PlantProfile;
}

const FollowButton: FC<Props> = ({ profile }) => {
  const token = usePlant().get("token").unwrapUndef();
  const client = useQueryClient();

  const { mutate, isPending } = useApi({
    fn: () => FollowService.toggle({ plantname: profile.plantname, token }),
    onSuccess: () => {
      toast.success(
        (profile.isFollowed ? "Unf" : "F") +
          `ollowed '${profile.name}' successfully`,
      );
      client.invalidateQueries({ queryKey: ["getProfile"] });
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <Loading
      on={isPending}
      component="button"
      className={clsx(
        "btn btn-sm xl:btn-md btn-primary capitalize",
        profile.isFollowed && "btn-outline",
      )}
      onClick={() => mutate()}
      disabled={isPending}
    >
      {profile.isFollowed && "un"}follow
    </Loading>
  );
};

export default FollowButton;
