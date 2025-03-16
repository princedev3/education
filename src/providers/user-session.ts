import { Session } from "next-auth";
import { create } from "zustand";

type sessionTypes = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};
export const useUserStore = create<sessionTypes>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));
