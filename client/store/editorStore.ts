import { StateCreator } from "zustand";

export interface editorFileInterface {
  activeTab: { path: string; value: string } | null;
  availableTabs: { [key: string]: boolean };
  folderStructure: folderStructureInterface | null;
}

export interface editorFileActionsInterface {
  removeActiveTab: () => void;
  setActiveTab: (path: string, value: string) => void;
  removeTabs: (path: string) => void;
  addOrUpdateTab: (path: string) => void;
  setFolderStructure: (folderStructure: folderStructureInterface) => void;
}

export const createEditorFileStore: StateCreator<
  editorFileInterface & editorFileActionsInterface,
  [],
  [],
  editorFileInterface
> = () => ({
  activeTab: null,
  availableTabs: {},
  folderStructure: null,
});

export const setEditorFileStore: StateCreator<
  editorFileInterface & editorFileActionsInterface,
  [],
  [],
  editorFileActionsInterface
> = (set, get) => ({
  removeActiveTab: () => {
    set({ activeTab: null });
  },
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
  removeTabs: (path) => {
    const availableTabs = get().availableTabs;
    delete availableTabs[path];
    set({ availableTabs: availableTabs });
  },
  setFolderStructure: (folderStructure) => {
    set({ folderStructure: folderStructure });
  },
});
