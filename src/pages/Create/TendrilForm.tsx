import { FC } from "react";

import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// local imports
import { Loading } from "@/components";
import { useApi, usePlant, useRecord, usePageTitle } from "@/hooks";
import { TendrilService } from "@/services";
import { RoutesMap } from "@/AppRoutes";

interface Props {
  uuid?: string;
  data?: TendrilData;
  onCancel?: Fn0;
  afterSuccess?: Fn0;
}

type TendrilData = { title: string; content: string };

const TendrilForm: FC<Props> = ({ uuid, data, onCancel, afterSuccess }) => {
  usePageTitle(RoutesMap.CREATE.title);

  const [tendril, updateTendril] = useRecord(
    data ?? { title: "", content: "" }
  );

  const navigate = useNavigate();
  const plant = usePlant().unwrap();

  function submitForm() {
    const method = uuid ? "update" : "create";
    return TendrilService[method]({ ...plant, data: tendril, uuid });
  }

  const { mutate, isPending } = useApi({
    fn: submitForm,
    onSuccess: () => {
      toast.success(`Tendril ${uuid ? "updated" : "created"} successfully`);
      afterSuccess ? afterSuccess() : navigate("/");
    },
    onError: (resp) => toast.error(resp?.message || "Something went wrong"),
  });

  return (
    <form
      onSubmit={(e) => (e.preventDefault(), mutate())}
      className="flex flex-col center grow min-h-0 h-full"
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
        {uuid && (
          <button type="button" onClick={onCancel} className="btn">
            Cancel
          </button>
        )}
        <Loading
          on={isPending}
          as="button"
          type="submit"
          className="btn btn-primary shadow"
          disabled={isPending}
        >
          {uuid ? "Update" : "Create"} Tendril
        </Loading>
      </div>
    </form>
  );
};

export default TendrilForm;
