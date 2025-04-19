import { Auth } from "@/@types/Auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  user: Auth | null;
  accessToken: string | null;
  tokenType: string | null;
  isAuthenticated: boolean;
  login: (data: {
    access_token: string;
    token_type: string;
    user: Auth;
  }) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      tokenType: null,
      isAuthenticated: false,
      login: (data) => {
        set({
          user: data.user,
          accessToken: data.access_token,
          tokenType: data.token_type,
          isAuthenticated: true,
        });
      },
      logout: () =>
        set({
          user: null,
          accessToken: null,
          tokenType: null,
          isAuthenticated: false,
        }),
      checkAuth: () => !!get().accessToken && !!get().user,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
