import { create } from "zustand";

export type Plant = {
  name: string;
  plantname: string;
  uuid: string; // update later
};

const emptyPlant: Plant = {
  name: "",
  plantname: "",
  uuid: "",
};

export const useAuthStore = create((set) => ({
  plant: emptyPlant,
  signin: (plant: Plant) => set(() => ({ plant })),
  signout: () => set(() => ({ plant: emptyPlant })),
}));
