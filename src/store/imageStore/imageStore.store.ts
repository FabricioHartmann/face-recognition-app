import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      registeredFile: "",
      registeredDescriptor: [],
      scannedFile: "",
      scannedDescriptor: [],
      setScannedFile: (src) => set({ scannedFile: src }),
      setRegisteredFile: (src) => set({ registeredFile: src }),
      setRegisteredDescriptor: (descriptor) =>
        set({ registeredDescriptor: descriptor }),
      setScannedDescriptor: (descriptor) =>
        set({ scannedDescriptor: descriptor }),
      clearScannedFileAndDescriptor: () =>
        set({ scannedFile: "", scannedDescriptor: [] }),
      clearAll: () =>
        set({
          registeredFile: "",
          registeredDescriptor: [],
          scannedFile: "",
          scannedDescriptor: [],
        }),
    }),

    {
      name: "image-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
