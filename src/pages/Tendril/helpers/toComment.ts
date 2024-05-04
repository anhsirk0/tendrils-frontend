import { Comment } from "../types";
import { Some } from "@/helpers";

function toComment(c: BackendData): Comment {
  return {
    id: Some.Number(c?.id),
    content: Some.String(c?.content),
    createdAt: Some.Number(c?.createdAt),
    plant: {
      name: Some.String(c?.plant?.name),
      plantname: Some.String(c?.plant?.plantname),
      avatarUrl: Some.String(c?.plant?.avatarUrl),
    },
  };
}

export default toComment;
