import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      registeredFileId: null,
      registeredDescriptor: [],
      setRegisteredFileId: (id) => set({ registeredFileId: id }),
      setRegisteredDescriptor: (descriptor) =>
        set({ registeredDescriptor: descriptor }),
      clearAll: () =>
        set({
          registeredFileId: null,
          registeredDescriptor: [],
        }),
    }),

    {
      name: "image-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
