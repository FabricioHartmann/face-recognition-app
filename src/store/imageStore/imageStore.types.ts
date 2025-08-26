export type ImageStateProps = {
  imageSrc: string;
  registeredDescriptor: number[];
  scannedDescriptor: number[];
  setImageSrc: (imgSrc: string) => void;
  deleteImage: () => void;
  setRegisteredDescriptor: (descriptor: number[]) => void;
  setScannedDescriptor: (descriptor: number[]) => void;
  clearRegisteredDescriptor: () => void;
  clearScannedDescriptor: () => void;
};
