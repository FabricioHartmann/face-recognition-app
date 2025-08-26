import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ImageStateProps } from "./imageStore.types";

export const useImageStore = create(
  persist<ImageStateProps>(
    (set) => ({
      imageSrc: "",
      registeredDescriptor: [],
      scannedDescriptor: [],
      setImageSrc: (src) => set({ imageSrc: src }),
      deleteImage: () => set({ imageSrc: "" }),
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
