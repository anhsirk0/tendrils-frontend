import { Some } from "@/helpers";
import { Tendril } from "../types";

function toTendril(t: BackendData): Tendril {
  return {
    id: Some.Number(t?.id),
    title: Some.String(t?.title),
    content: Some.String(t?.content),
    uuid: Some.String(t?.uuid),
    createdAt: Some.Number(t?.createdAt),
    curls: Some.Array(t?.curls).map((c) => Some.String(c?.plantname)),
    commentsCount: Some.Number(t?.commentsCount),
  };
}

export default toTendril;
