export interface PlantProfile extends Pick<Plant, "id" | "name" | "plantname"> {
  followersCount: number;
  followingCount: number;
  tendrilsCount: number;
  isFollowed: boolean;
  createdAt: number;
  isMe: boolean;
}

