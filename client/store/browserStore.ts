import { StateCreator } from "zustand";

export interface browserPortInterface {
  port: number;
}

export interface browserPortActionsInterface {
  setPort: (port: number) => void;
}

export const createBrowserPortStore: StateCreator<
  browserPortInterface & browserPortActionsInterface,
  [],
  [],
  browserPortInterface
> = () => ({
  port: 0,
});

export const setBrowserPortStore: StateCreator<
  browserPortInterface & browserPortActionsInterface,
  [],
  [],
  browserPortActionsInterface
> = (set, get) => ({
  setPort: (port) => {
    set({ port: port });
  },
});
