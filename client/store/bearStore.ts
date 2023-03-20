import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  createUserStore,
  userActionsInterface,
  userStateInterface,
  setUserStore,
} from "./userStore";

export const useBearStore = create<userStateInterface & userActionsInterface>()(
  devtools((...a) => ({
    ...createUserStore(...a),
    ...setUserStore(...a),
  }))
);
