import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useFaceApiModels } from "./useFaceApiModels.hook";
import { modelsToastVariants } from "../../utils/faceApiManipulators/faceApiModelsToastsVariants";

export function useModelsToasts() {
  const toast = useToast();
  const modelsReady = useFaceApiModels();

  useEffect(() => {
    console.log(modelsReady);
    if (modelsReady === "loading") {
      toast(modelsToastVariants.loading);
      return;
    }
    if (modelsReady === "success") {
      toast.close("models-loading");
      toast(modelsToastVariants.success);
      return;
    }
    if (modelsReady === "error") {
      toast.close("models-loading");
      toast(modelsToastVariants.error);
    }
  }, [modelsReady, toast]);
}
