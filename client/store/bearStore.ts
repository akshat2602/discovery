import { create } from "zustand";

import { createUserStore, userStateInterface } from "./userStore";

export const useBearStore = create<userStateInterface>()((...a) => ({
  ...createUserStore(...a),
}));
