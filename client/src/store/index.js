import { create } from "zustand";
import { createAuthSlice } from "./slices/auth_slice";
import { createChatSlice } from "./slices/chat_slice"; 

export const useAppStore = create() ((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}))