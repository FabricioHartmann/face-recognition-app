import { useEffect, useRef, useState } from "react";

type FaceApiStatus = "idle" | "loading" | "success" | "error";

export function useFaceApiModelWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [status, setStatus] = useState<FaceApiStatus>("idle");

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../workers/modelsWorker.ts", import.meta.url),
      { type: "module" }
    );

    workerRef.current.onmessage = (e) => {
      const { action, success } = e.data;
      if (action === "models-loaded") {
        setStatus(success ? "success" : "error");
      }
    };

    setStatus("loading");
    workerRef.current.postMessage({ action: "load-models" });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return { status, worker: workerRef.current };
}