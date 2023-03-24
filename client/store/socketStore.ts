import { StateCreator } from "zustand";

export interface shellSocketInterface {
  wsForShell: WebSocket | null;
}

export interface shellSocketActionsInterface {
  setTerminalWs: (ws: WebSocket) => void;
}

export const createShellSocketStore: StateCreator<
  shellSocketInterface & shellSocketActionsInterface,
  [],
  [],
  shellSocketInterface
> = () => ({
  wsForShell: null,
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
