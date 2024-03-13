import MDEditor from "@uiw/react-md-editor";
import { useRecord } from "@/hooks";

const Create = () => {
  const [tendril, updateTendril] = useRecord({
    title: "",
    content: "",
  });

  return (
    <div className="flex flex-col justify-center items-center grow">
      <div className="w-full grow p-2 md:py-4 gap-4">
        <div
          id="content"
          className="w-full h-full rounded-box border border-base-content/20"
        >
          <MDEditor
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
          className="input input-bordered w-full"
          value={tendril.title}
          onChange={(e) => updateTendril("title", e.target.value)}
        />
        <button className="btn btn-primary">Create Tendril</button>
      </div>
    </div>
  );
};

export default Create;
