import { Some } from "@/helpers";
import { PlantProfile } from "../types";

function toPlantProfile(p: BackendData): PlantProfile {
  return {
    id: Some.Number(p?.id),
    name: Some.String(p?.name),
    plantname: Some.String(p?.plantname),
    followersCount: Some.Number(p?.followersCount),
    followingCount: Some.Number(p?.followingCount),
    tendrilsCount: Some.Number(p?.tendrilsCount),
    isFollowed: Some.Boolean(p?.isFollowed),
    isMe: Some.Boolean(p?.isMe),
    createdAt: Some.Number(p?.createdAt),
  };
}
export default toPlantProfile;
