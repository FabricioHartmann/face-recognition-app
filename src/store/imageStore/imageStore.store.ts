import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      registeredFile: "",
      registeredDescriptor: [],
      setRegisteredFile: (file) => set({ registeredFile: file }),
      setRegisteredDescriptor: (descriptor) =>
        set({ registeredDescriptor: descriptor }),
      clearAll: () =>
        set({
          registeredFile: "",
          registeredDescriptor: [],
        }),
    }),

    {
      name: "image-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
