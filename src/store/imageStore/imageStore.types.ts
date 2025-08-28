export type ImageStateProps = {
  registeredImageSrc: string;
  scannedImageSrc: string;
  registeredDescriptor: number[];
  scannedDescriptor: number[];
  setRegisteredImageSrc: (imgSrc: string) => void;
  setScannedImageSrc: (imgSrc: string) => void;
  deleteScannedImageSrc: () => void;
  deleteRegisteredImageSrc: () => void;
  setRegisteredDescriptor: (descriptor: number[]) => void;
  setScannedDescriptor: (descriptor: number[]) => void;
  clearRegisteredDescriptor: () => void;
  clearScannedDescriptor: () => void;
};
