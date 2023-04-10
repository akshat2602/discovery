import { StateCreator } from "zustand";

export interface fileOrFolderInterface {
  path: string | null;
  isFile: number;
}

export interface fileOrFolderActionsInterface {
  setIsFile: (isFile: number) => void;
  setPath: (path: string | null) => void;
}

export const createFileOrFolderStore: StateCreator<
  fileOrFolderInterface & fileOrFolderActionsInterface,
  [],
  [],
  fileOrFolderInterface
> = (set) => ({
  path: null,
  isFile: -1,
});

export const setFileOrFolderStore: StateCreator<
  fileOrFolderInterface & fileOrFolderActionsInterface,
  [],
  [],
  fileOrFolderActionsInterface
> = (set) => ({
  setIsFile: (isFile) => set({ isFile: isFile }),
  setPath: (path) => set({ path: path }),
});
