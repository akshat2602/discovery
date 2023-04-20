import { StateCreator } from "zustand";
import { Result, randomUserInterface } from "../types/randomUserType";

export interface RandomUserStoreInterface {
  users: Result[];
}

export interface RandomUserActionInterface {
  setUserData: (res: randomUserInterface) => void;
}

export const randomUserStore: StateCreator<
  RandomUserStoreInterface & RandomUserActionInterface,
  [],
  [],
  RandomUserStoreInterface
> = () => ({
  users: [],
});

export const randomUserAction: StateCreator<
  RandomUserStoreInterface & RandomUserActionInterface,
  [],
  [],
  RandomUserActionInterface
> = (set) => ({
  setUserData: (res: randomUserInterface) => {
    set((state) => ({
      users: res.results,
    }));
  },
});
