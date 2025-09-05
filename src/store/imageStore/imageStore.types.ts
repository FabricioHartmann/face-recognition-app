export type ImageStateProps = {
  registeredFile: string;
  scannedFile: string;
  registeredDescriptor: number[];
  scannedDescriptor: number[];
  setRegisteredFile: (file: string) => void;
  setScannedFile: (file: string) => void;
  deleteScannedFile: () => void;
  deleteRegisteredFile: () => void;
  setRegisteredDescriptor: (descriptor: number[]) => void;
  setScannedDescriptor: (descriptor: number[]) => void;
  clearRegisteredDescriptor: () => void;
  clearScannedDescriptor: () => void;
};
