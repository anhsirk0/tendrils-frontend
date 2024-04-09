export type Tendril = {
  id: number;
  title: string;
  content: string;
  uuid: string;
  createdAt: number;
  curls: Array<string>;
  commentsCount: number;
};
export type FeedTendril = Tendril & {
  author: Pick<Plant, "name" | "plantname">;
};
export type Followee = Pick<Plant, "id" | "name" | "plantname"> & {
  isMe: boolean;
  isFollowed: boolean;
};
