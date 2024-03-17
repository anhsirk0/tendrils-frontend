import { create } from "zustand";
import { persist } from "zustand/middleware";

// const emptyPlant: Plant = {
//   id: 0,
//   name: "",
//   plantname: "",
//   token: "",
//   isLoggedIn: false,
// };

export type StoreState = {
  plant: Plant | null;
  signin: (plant: Plant) => void;
  signout: () => void;
};

const useAuthStore = create<StoreState, [["zustand/persist", StoreState]]>(
  persist(
    (set) => ({
      plant: null,
      signin: (plant: Plant) => set(() => ({ plant })),
      signout: () => set(() => ({ plant: null })),
    }),
    { name: "tendrils-user-info" },
  ),
);

export { useAuthStore };
