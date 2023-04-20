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

import {
  createBrowserPortStore,
  setBrowserPortStore,
  browserPortActionsInterface,
  browserPortInterface,
} from "./browserStore";

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
    fileOrFolderInterface &
    browserPortActionsInterface &
    browserPortInterface
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
    ...createBrowserPortStore(...a),
    ...setBrowserPortStore(...a),
  }))
);
