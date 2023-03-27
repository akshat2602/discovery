import { StateCreator } from "zustand";

export interface shellSocketInterface {
  wsForShell: WebSocket | null;
}

export interface editorSocketInterface {
  wsForEditor: WebSocket | null;
}

export interface shellSocketActionsInterface {
  setTerminalWs: (ws: WebSocket) => void;
}

export interface editorSocketActionsInterface {
  setEditorWs: (ws: WebSocket) => void;
}

export const createShellSocketStore: StateCreator<
  shellSocketInterface & shellSocketActionsInterface,
  [],
  [],
  shellSocketInterface
> = () => ({
  wsForShell: null,
});

export const createEditorSocketStore: StateCreator<
  editorSocketInterface & editorSocketActionsInterface,
  [],
  [],
  editorSocketInterface
> = () => ({
  wsForEditor: null,
});

export const setEditorSocketStore: StateCreator<
  editorSocketInterface & editorSocketActionsInterface,
  [],
  [],
  editorSocketActionsInterface
> = (set) => ({
  setEditorWs: (ws: WebSocket) => {
    set((state) => ({
      wsForEditor: ws,
    }));
  },
});

export const setShellSocketStore: StateCreator<
  shellSocketInterface & shellSocketActionsInterface,
  [],
  [],
  shellSocketActionsInterface
> = (set) => ({
  setTerminalWs: (ws: WebSocket) => {
    set((state) => ({
      wsForShell: ws,
    }));
  },
});
