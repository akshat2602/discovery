import { StateCreator } from "zustand";

export interface editorFileInterface {
  activeTab: { path: string; value: string } | null;
}

export interface editorFileActionsInterface {
  setActiveTab: (path: string, value: string) => void;
}

export const createEditorFileStore: StateCreator<
  editorFileInterface & editorFileActionsInterface,
  [],
  [],
  editorFileInterface
> = () => ({
  activeTab: null,
});

export const setEditorFileStore: StateCreator<
  editorFileInterface & editorFileActionsInterface,
  [],
  [],
  editorFileActionsInterface
> = (set) => ({
  setActiveTab: (path, value) => {
    set((state) => ({
      activeTab: { path: path, value: value },
    }));
  },
});
