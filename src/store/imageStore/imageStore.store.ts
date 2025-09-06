import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      registeredFileId: null,
      registeredDescriptor: [],
      scannedFileId: null,
      scannedDescriptor: [],
      setScannedFileId: (id) => set({ scannedFileId: id }),
      setRegisteredFileId: (id) => set({ registeredFileId: id }),
      setRegisteredDescriptor: (descriptor) =>
        set({ registeredDescriptor: descriptor }),
      setScannedDescriptor: (descriptor) =>
        set({ scannedDescriptor: descriptor }),
      clearScannedFileAndDescriptor: () =>
        set({ scannedFileId: null, scannedDescriptor: [] }),
      clearAll: () =>
        set({
          registeredFileId: null,
          registeredDescriptor: [],
          scannedFileId: null,
          scannedDescriptor: [],
        }),
    }),

    {
      name: "image-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
