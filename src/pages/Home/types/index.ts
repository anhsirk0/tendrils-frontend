export type Tendril = {
  id: number;
  title: string;
  content: string;
  uuid: string;
  createdAt: number;
  curls: Array<string>;
};

export type Followee = Pick<Plant, "id" | "name" | "plantname">;
