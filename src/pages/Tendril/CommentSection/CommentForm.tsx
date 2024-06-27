import { FC, useState } from "react";

// other imports
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

// local imports
import { Button } from "@/components";
import { useApi, usePlant } from "@/hooks";
import { CommentService } from "@/services";

interface Props {
  uuid: string;
  onCancel: Fn0;
  afterSuccess: Fn0;
}

const CommentForm: FC<Props> = ({ uuid, onCancel, afterSuccess }) => {
  const [content, setContent] = useState("");
  const token = usePlant().unwrap().token;
  const client = useQueryClient();

  const { mutate, isPending } = useApi({
    fn: () => CommentService.add({ data: { content, uuid }, token }),
    onSuccess: () => {
      toast.success("Comment added successfully");
      client.invalidateQueries({ queryKey: ["getComments"] });
      afterSuccess();
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <div className="flex flex-col gap-2 2xl:gap-4">
      <textarea
        id="comment-box"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea textarea-bordered grow"
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
  );
};

export default CommentForm;
