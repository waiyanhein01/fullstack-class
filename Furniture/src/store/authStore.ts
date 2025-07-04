import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

export enum Status {
  register = "register",
  verify_otp = "verify-otp",
  confirm_password = "confirm-password",
  reset_password = "reset-password",
  none = "none",
}

type State = {
  phone: string | null;
  token: string | null;
  status: Status;
};

const initialState: State = {
  phone: null,
  token: null,
  status: Status.none,
};

type Actions = {
  setAuth: (phone: string, token: string, status: Status) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: (phone, token, status) =>
        set((state) => {
          state.phone = phone;
          state.token = token;
          state.status = status;
        }),
      resetAuth: () => set(initialState),
    })),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
