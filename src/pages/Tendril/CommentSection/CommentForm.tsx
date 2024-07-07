import { FC, useState } from "react";

// other imports
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Transition } from "@headlessui/react";

// local imports
import { Button } from "@/components";
import { useApi, usePlant } from "@/hooks";
import { CommentService } from "@/services";

interface Props {
  show: boolean;
  uuid: string;
  onCancel: Fn0;
  afterSuccess: Fn0;
}

const CommentForm: FC<Props> = ({ uuid, onCancel, afterSuccess, show }) => {
  const [content, setContent] = useState("");
  const token = usePlant().prop("token").getUndef();
  const client = useQueryClient();

  const { mutate, isPending } = useApi({
    fn: () => CommentService.add({ data: { content, uuid }, token }),
    onSuccess: () => {
      toast.success("Comment added successfully");
      client.invalidateQueries({ queryKey: ["getComments"] });
      setContent("");
      afterSuccess();
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <Transition show={show}>
      <div className="max-h-full transition-all ease-in-out duration-300 data-[closed]:max-h-0 data-[leave]:data-[closed]:max-h-0 overflow-hidden">
        <div className="flex flex-col gap-4 2xl:gap-8 mt-4 2xl:mt-8 m-1">
          <textarea
            id="comment-box"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered grow h-32"
            placeholder="Add comment"
            required
          />
          <div className="flex gap-2 2xl:gap-4 justify-end">
            <Button
              loading={isPending}
              className="btn-primary"
              onClick={(e) => (e.stopPropagation(), mutate())}
            >
              Comment
            </Button>
            <Button className="btn-neutral" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default CommentForm;
