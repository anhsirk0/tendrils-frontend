import { Some } from "@/helpers";
import { FeedTendril } from "../types";
import toTendril from "./toTendril";

function toFeedTendril(t: BackendData): FeedTendril {
  return {
    ...toTendril(t),
    author: {
      name: Some.String(t?.author?.name),
      plantname: Some.String(t?.author?.plantname),
    },
  };
}

export default toFeedTendril;
