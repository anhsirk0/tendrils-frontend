import { FC } from "react";

// other imports
import { Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

// local imports
/* import { TendrilService } from "@/services"; */
import { usePageTitle } from "@/hooks";
import { toProfileLink, toAvatar } from "@/helpers";
import { FeedTendril } from "@/pages/Home/types";
import FloatingActions from "./FloatingActions";
import CommentSection from "./CommentSection";

const TendrilView: FC<{ tendril: FeedTendril }> = ({ tendril }) => {
  usePageTitle(tendril.title + ` (by @${tendril.author.plantname})`);
  return (
    <div className="flex flex-col h-full w-full max-w-7xl gap-4 2xl:gap-8">
      <div className="flex w-full justify-between items-end border-b border-b-base-content/30 pb-1">
        <div className="text-5xl pb-1 truncate">{tendril.title}</div>
        <AuthorInfo {...tendril.author} />
      </div>
      <MDEditor.Markdown source={tendril.content} />
      <CommentSection tendril={tendril} />
      <FloatingActions />
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
