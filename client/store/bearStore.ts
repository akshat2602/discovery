import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  createUserStore,
  userActionsInterface,
  userStateInterface,
  setUserStore,
} from "./userStore";

import {
  createShellSocketStore,
  createEditorSocketStore,
  shellSocketActionsInterface,
  editorSocketActionsInterface,
  editorSocketInterface,
  shellSocketInterface,
  setShellSocketStore,
  setEditorSocketStore,
} from "./socketStore";

import {
  createEditorFileStore,
  editorFileActionsInterface,
  editorFileInterface,
  setEditorFileStore,
} from "./editorStore";

import {
  createFileOrFolderStore,
  setFileOrFolderStore,
  fileOrFolderActionsInterface,
  fileOrFolderInterface,
} from "./folderStore";

export const useBearStore = create<
  userStateInterface &
    userActionsInterface &
    shellSocketActionsInterface &
    shellSocketInterface &
    editorSocketActionsInterface &
    editorSocketInterface &
    editorFileActionsInterface &
    editorFileInterface &
    fileOrFolderActionsInterface &
    fileOrFolderInterface
>()(
  devtools((...a) => ({
    ...createUserStore(...a),
    ...setUserStore(...a),
    ...createShellSocketStore(...a),
    ...setShellSocketStore(...a),
    ...createEditorSocketStore(...a),
    ...setEditorSocketStore(...a),
    ...createEditorFileStore(...a),
    ...setEditorFileStore(...a),
    ...createFileOrFolderStore(...a),
    ...setFileOrFolderStore(...a),
  }))
);
