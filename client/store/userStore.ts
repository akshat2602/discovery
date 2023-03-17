import { StateCreator } from "zustand";

export interface userStateInterface {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const createUserStore: StateCreator<userStateInterface> = (set) => ({
  pk: 0,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  setUserInfo: (userInfo: userStateInterface) => set(userInfo),
});

export {};
