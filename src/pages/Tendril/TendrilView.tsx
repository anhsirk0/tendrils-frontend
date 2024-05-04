import { FC } from "react";

// icons imports
import { IconEdit } from "@tabler/icons-react";

// other imports
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

// local imports
import { toAvatar, toProfileLink } from "@/helpers";
import { usePageTitle, usePlant, useResponsive } from "@/hooks";
import { FeedTendril } from "@/pages/Home/types";
import FloatingActions from "./FloatingActions";
import CommentSection from "./CommentSection";

interface Props {
  tendril: FeedTendril;
  onEditClick: Fn0;
}

const TendrilView: FC<Props> = ({ tendril, onEditClick }) => {
  usePageTitle(tendril.title + ` (by @${tendril.author.plantname})`);
  const R = useResponsive();
  const isMe = usePlant()
    .run((p) => p.plantname === tendril.author.plantname)
    .unwrapOr(false);

  return (
    <div className="flex flex-col h-full w-full max-w-7xl gap-4 2xl:gap-8">
      <div className="flex w-full justify-between items-end border-b border-b-base-content/30 pb-1">
        <div className="text-5xl pb-1 truncate">{tendril.title}</div>
        <AuthorInfo {...tendril.author} />
      </div>
      <MDEditor.Markdown source={tendril.content} />
      <CommentSection tendril={tendril} />
      <FloatingActions>
        {isMe && (
          <div className="tooltip tooltip-primary" data-tip="Edit Tendril">
            <button
              className="btn btn-primary btn-sm 2xl:btn-md"
              onClick={onEditClick}
            >
              <IconEdit size={R({ base: 20, lg: 24, "2xl": 28 })} />
            </button>
          </div>
        )}
      </FloatingActions>
    </div>
  );
};

const AuthorInfo: FC<FeedTendril["author"]> = (author) => (
  <Link
    to={toProfileLink(author.plantname)}
    onClick={(e) => e.stopPropagation()}
    className="flex items-center btn-ghost rounded-btn p-1 2xl:p-2"
  >
    <p className="truncate md:text-lg 2xl:text-2xl px-2">{author.name}</p>
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content md:text-lg 2xl:text-xl rounded-btn w-8 2xl:w-10">
        {author.avatarUrl ? (
          <img alt="avatar" src={author.avatarUrl} />
        ) : (
          toAvatar(author.name)
        )}
      </div>
    </div>
  </Link>
);

export default TendrilView;
