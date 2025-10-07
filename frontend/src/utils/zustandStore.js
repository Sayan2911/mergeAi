import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userId: null,
      setToken: (newToken) => set({ token: newToken }),
      clearToken: () => set({ token: null }),

      setUserId: (newId) => set({ userId: newId }),
      clearUserId: () => set({ userId: null }),

      // AI toggles
      isFirstAi: true,
      toggleFirstAi: () => set((state) => ({ isFirstAi: !state.isFirstAi })),

      isSecondAi: true,
      toggleSecondAi: () => set((state) => ({ isSecondAi: !state.isSecondAi })),

      isThirdAi: true,
      toggleThirdAi: () => set((state) => ({ isThirdAi: !state.isThirdAi })),
    }),
    {
      name: "auth-storage", // name of the item in local storage
      storage: createJSONStorage(() => sessionStorage), // specify local storage
    }
  )
);
