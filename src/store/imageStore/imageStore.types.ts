export type ImageStateProps = {
  registeredFile: string;
  registeredDescriptor: number[];
  setRegisteredFile: (file: string) => void;
  setRegisteredDescriptor: (descriptor: number[]) => void;
  clearAll: () => void;
};
