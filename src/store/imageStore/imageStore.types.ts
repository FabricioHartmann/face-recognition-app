export type ImageStateProps = {
  registeredFileId: IDBValidKey | null;
  registeredDescriptor: number[];
  setRegisteredFileId: (id: IDBValidKey | null) => void;
  setRegisteredDescriptor: (descriptor: number[]) => void;
  clearAll: () => void;
};
