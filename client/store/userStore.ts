import { StateCreator } from "zustand";

export interface userInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
export interface userStateInterface {
  user: userInterface;
}

export interface userActionsInterface {
  setUserInfo: (userInfo: userInterface) => void;
}

export const createUserStore: StateCreator<
  userStateInterface & userActionsInterface,
  [],
  [],
  userStateInterface
> = () => ({
  user: {
    id: -9999,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  },
});

export const setUserStore: StateCreator<
  userStateInterface & userActionsInterface,
  [],
  [],
  userActionsInterface
> = (set) => ({
  setUserInfo: (userInfo: userInterface) => {
    set((state) => ({
      user: userInfo,
    }));
  },
});
