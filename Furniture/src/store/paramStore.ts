import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ParamState {
  params: string;
}

const initialState: ParamState = {
  params: "",
};

interface ParamActions {
  getParams: () => string;
  setParams: (params: string) => void;
  resetParams: () => void;
}

export const useParamStore = create<ParamState & ParamActions>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      getParams: () => get().params,
      setParams: (params: string) => set({ params }),
      resetParams: () => set({ params: "" }),
    })),
    {
      name: "params",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
