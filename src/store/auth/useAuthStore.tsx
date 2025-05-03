import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  login: () => set({ isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
