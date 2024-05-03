export interface PlantProfile
  extends Pick<Plant, "id" | "name" | "plantname" | "avatarUrl"> {
  followersCount: number;
  followingCount: number;
  tendrilsCount: number;
  isFollowed: boolean;
  createdAt: number;
  isMe: boolean;
}
