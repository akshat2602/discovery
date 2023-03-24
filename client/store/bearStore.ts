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
  shellSocketActionsInterface,
  shellSocketInterface,
  setShellSocketStore,
} from "./socketStore";

export const useBearStore = create<
  userStateInterface &
    userActionsInterface &
    shellSocketActionsInterface &
    shellSocketInterface
>()(
  devtools((...a) => ({
    ...createUserStore(...a),
    ...setUserStore(...a),
    ...createShellSocketStore(...a),
    ...setShellSocketStore(...a),
  }))
);
