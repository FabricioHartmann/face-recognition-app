import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      registeredImageSrc: "",
      registeredDescriptor: [],
      scannedDescriptor: [],
      scannedImageSrc: "",
      setScannedImageSrc: (src) => set({ scannedImageSrc: src }),
      setRegisteredImageSrc: (src) => set({ registeredImageSrc: src }),
      deleteRegisteredImageSrc: () => set({ registeredImageSrc: "" }),
      deleteScannedImageSrc: () => set({ scannedImageSrc: "" }),
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
