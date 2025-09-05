import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      registeredFile: "",
      registeredDescriptor: [],
      scannedDescriptor: [],
      scannedFile: "",
      setScannedFile: (src) => set({ scannedFile: src }),
      setRegisteredFile: (src) => set({ registeredFile: src }),
      deleteRegisteredFile: () => set({ registeredFile: "" }),
      deleteScannedFile: () => set({ scannedFile: "" }),
      setRegisteredDescriptor: (descriptor) => set({ registeredDescriptor: descriptor }),
      clearRegisteredDescriptor: () => set({ registeredDescriptor: [] }),
      setScannedDescriptor: (descriptor) =>
        set({ scannedDescriptor: descriptor }),
      clearScannedDescriptor: () => set({ scannedDescriptor: [] }),
    }),

    {
      name: "image-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
