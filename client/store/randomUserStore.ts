import { StateCreator } from "zustand";
import { randomUserInterface } from "../types/randomUserType";

export interface RandomUserAction {
  setUserData: (users: randomUserInterface) => void;
}

export const randomUserStore: StateCreator<
  randomUserInterface & RandomUserAction,
  [],
  [],
  randomUserInterface
> = () => ({
  results: [],
  info: {
    seed: "",
    results: 0,
    page: 0,
    version: "",
  },
});

export const randomUserAction: StateCreator<
  randomUserInterface & RandomUserAction,
  [],
  [],
  RandomUserAction
> = (set) => ({
  setUserData: (users: randomUserInterface) => {
    set((state) => ({
      results: users.results,
      info: users.info,
    }));
  },
});
