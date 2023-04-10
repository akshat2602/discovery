import { StateCreator } from "zustand";

export interface editorFileInterface {
  activeTab: { path: string; value: string } | null;
  availableTabs: { [key: string]: boolean };
  // folderStructure: {}
}

export interface editorFileActionsInterface {
  setActiveTab: (path: string, value: string) => void;
  addOrUpdateTab: (path: string) => void;
}

export const createEditorFileStore: StateCreator<
  editorFileInterface & editorFileActionsInterface,
  [],
  [],
  editorFileInterface
> = () => ({
  activeTab: null,
  availableTabs: {},
});

export const setEditorFileStore: StateCreator<
  editorFileInterface & editorFileActionsInterface,
  [],
  [],
  editorFileActionsInterface
> = (set, get) => ({
  setActiveTab: (path, value) => {
    set({
      activeTab: { path: path, value: value },
    });
  },
  addOrUpdateTab: (path) => {
    const availableTabs = get().availableTabs;
    Object.keys(availableTabs).forEach((key) => {
      availableTabs[key] = false;
    });
    const newState = { ...availableTabs, [path]: true };
    set({ availableTabs: newState });
  },
});
