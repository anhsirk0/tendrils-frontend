import { create } from "zustand";
import { persist } from "zustand/middleware";

import { toMaybe, Maybe } from "@/helpers";

// const emptyPlant: Plant = {
//   id: 0,
//   name: "",
//   plantname: "",
//   token: "",
//   isLoggedIn: false,
// };

export type StoreState = {
  plant: Maybe<Plant>;
  signin: (plant: Plant) => void;
  signout: () => void;
};

const useAuthStore = create<StoreState, [["zustand/persist", StoreState]]>(
  persist(
    (set) => ({
      plant: toMaybe(),
      signin: (plant: Plant) => set(() => ({ plant: toMaybe(plant) })),
      signout: () => set(() => ({ plant: toMaybe() })),
    }),
    { name: "tendrils-user-info" },
  ),
);

export { useAuthStore };
