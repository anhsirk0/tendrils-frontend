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

export type StoreState = {
  plant: Plant;
  signin: (plant: Plant) => void;
  signout: () => void;
};

export const useAuthStore = create<StoreState>((set) => ({
  plant: emptyPlant,
  signin: (plant: Plant) => set(() => ({ plant })),
  signout: () => set(() => ({ plant: emptyPlant })),
}));
