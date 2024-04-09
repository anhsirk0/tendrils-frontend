import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { TendrilService } from "@/services";
import { Loading } from "@/components";
import { useRecord, useApi, usePlant } from "@/hooks";

const Create = () => {
  const [tendril, updateTendril] = useRecord({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const plant = usePlant().unwrap();

  const { mutate, isPending } = useApi({
    fn: () => TendrilService.create({ ...plant, data: tendril }),
    onSuccess: () => {
      toast.success("Tendril created successfully");
      navigate("/");
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <form
      onSubmit={(e) => (e.preventDefault(), mutate())}
      className="flex flex-col center grow min-h-0"
    >
      <div className="w-full grow p-2 md:py-4 gap-4 min-h-0 overflow-auto">
        <div
          id="content"
          className="w-full h-full rounded-box border border-base-content/20"
        >
          <MDEditor
            textareaProps={{ required: true }}
            onChange={(text) => updateTendril("content", text ?? "")}
            value={tendril.content}
          />
          <MDEditor.Markdown
            source={tendril.content}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row p-2 md:py-4 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered grow"
          value={tendril.title}
          onChange={(e) => updateTendril("title", e.target.value)}
          required
        />
        <Loading
          on={isPending}
          component="button"
          type="submit"
          className="btn btn-primary shadow"
          disabled={isPending}
        >
          Create Tendril
        </Loading>
      </div>
    </form>
  );
};

export default Create;
