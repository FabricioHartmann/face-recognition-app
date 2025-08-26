import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useFaceApiModels } from "../useFaceApiModels/useFaceApiModels.hook";
import { modelsToastVariants } from "../../utils/faceApiModelsToastsVariants";

export function useFaceApiModelsToasts() {
  const toast = useToast();
  const modelsReady = useFaceApiModels();

  useEffect(() => {
    console.log(modelsReady);
    if (modelsReady === "loading") toast(modelsToastVariants.loading);
    else if (modelsReady === "success") {
      toast.close("faceapi-loading");
      toast(modelsToastVariants.success);
    } else if (modelsReady === "error") {
      toast.close("faceapi-loading");
      toast(modelsToastVariants.error);
    }
  }, [modelsReady, toast]);
}
