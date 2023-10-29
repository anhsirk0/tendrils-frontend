import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Plant = {
  name: string;
  plantname: string;
  uuid: string; // update later
};

const emptyPlant: Plant = { name: "", plantname: "", uuid: "" };

export type StoreState = {
  plant: Plant;
  signin: (plant: Plant) => void;
  signout: () => void;
};

const useAuthStore = create<StoreState, [["zustand/persist", StoreState]]>(
  persist(
    (set) => ({
      plant: emptyPlant,
      signin: (plant: Plant) => set(() => ({ plant })),
      signout: () => set(() => ({ plant: emptyPlant })),
    }),
    { name: "tendrils-user-info" },
  ),
);

export { useAuthStore };
