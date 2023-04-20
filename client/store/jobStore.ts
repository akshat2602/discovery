import { create } from "zustand";

interface jobStateInterface {
  jobs: jobInterface[];
  setJobData: (jobs: jobInterface[]) => void;
}

export const useJobStore = create<jobStateInterface>()((set, get) => ({
  jobs: [],
  setJobData: (jobs: jobInterface[]) => {
    set({ jobs: jobs });
  },
}));
