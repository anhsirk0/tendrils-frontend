export type Comment = {
  id: number;
  content: string;
  createdAt: number;
  plant: Pick<Plant, "plantname" | "name">;
};
