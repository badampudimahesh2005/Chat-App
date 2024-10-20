import { create } from "zustand";
import { createAuthSlice } from "./slices/auth_slice";

export const useAppStore = create() ((...a) => ({
    ...createAuthSlice(...a),
}))