import type { ReactNode } from "react";

export type MainLayoutrProps = {
  children: ReactNode;
  title: string;
  onImageUpload: (img: HTMLImageElement) => void;
  onCameraUpload?: (img: HTMLImageElement) => void;
};
