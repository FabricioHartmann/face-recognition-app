export type ImageStateProps = {
  registeredFileId: IDBValidKey | null;
  scannedFileId: IDBValidKey | null;
  registeredDescriptor: number[];
  scannedDescriptor: number[];
  setRegisteredFileId: (id: IDBValidKey | null) => void;
  setScannedFileId: (id: IDBValidKey | null) => void;
  setRegisteredDescriptor: (descriptor: number[]) => void;
  setScannedDescriptor: (descriptor: number[]) => void;
  clearScannedFileAndDescriptor: () => void;
  clearAll: () => void;
};
