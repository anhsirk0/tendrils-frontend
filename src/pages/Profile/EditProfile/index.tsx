import { FC } from "react";

// other imports
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { toTitleCase } from "@/helpers";
import { useApi, usePlant, useRecord } from "@/hooks";
import { PlantService } from "@/services";
import { useAuthStore } from "@/store";
import { PlantProfile } from "../types";

interface Props {
  profile: PlantProfile;
  onCancel: Fn0;
}

const EditProfile: FC<Props> = ({ profile, onCancel }) => {
  const { update: updatePlant } = useAuthStore();

  const token = usePlant().unwrap().token;
  const client = useQueryClient();

  const [info, updateInfo] = useRecord({
    name: profile.name,
    avatar: profile.avatarUrl,
  });

  const { mutate, isPending } = useApi({
    fn: () =>
      PlantService.updateProfile({
        data: { name: info.name, avatarUrl: info.avatar },
        token,
      }),
    onSuccess: () => {
      updatePlant({ name: info.name, avatarUrl: info.avatar });
      toast.success("Profile updated successfully");
      client.invalidateQueries({ queryKey: ["getProfile"] });
      onCancel();
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <form
      onSubmit={(e) => (e.preventDefault(), mutate())}
      className="flex flex-col max-w-5xl h-full w-full gap-2 2xl:gap-4"
    >
      <h2 className="text-lg md:text-xl 2xl:text-2xl font-bold line-clamp-1">
        Edit Profile
      </h2>
      {Object.keys(info).map((kee) => {
        const key = kee as keyof typeof info;
        return (
          <label key={kee} className="form-control w-full">
            <div className="label">
              <span className="label-text">{toTitleCase(kee)}</span>
            </div>
            <input
              value={info[key]}
              onChange={(e) => updateInfo(key, e.target.value)}
              name={kee}
              className="input input-bordered"
              required={key === "name"}
            />
          </label>
        );
      })}
      <div className="flex gap-2 2xl:gap-4 justify-end mt-2 2xl:mt-4">
        <button type="button" onClick={onCancel} className="btn">
          Cancel
        </button>
        <Loading
          on={isPending}
          component="button"
          className="btn btn-primary"
          disabled={isPending}
          type="submit"
        >
          Save
        </Loading>
      </div>
    </form>
  );
};

export default EditProfile;
