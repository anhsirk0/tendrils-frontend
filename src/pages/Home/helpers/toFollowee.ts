import { Some } from "@/helpers";
import { Followee } from "../types";

function toFollowee(p: BackendData): Followee {
  return {
    id: Some.Number(p?.id),
    name: Some.String(p?.name),
    plantname: Some.String(p?.plantname),
    isMe: Some.Boolean(p?.isMe),
    isFollowed: Some.Boolean(p?.isFollowed),
  };
}

export default toFollowee;
