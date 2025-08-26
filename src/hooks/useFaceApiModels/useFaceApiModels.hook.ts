import { useEffect, useState } from "react"
import * as faceapi from "face-api.js"

type FaceApiStatus = "idle" | "loading" | "success" | "error"

export function useFaceApiModels() {
  const [status, setStatus] = useState<FaceApiStatus>("idle")

  useEffect(() => {
    if (status !== "idle") return

    const loadModels = async () => {
      setStatus("loading")
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ])
        setStatus("success")
      } catch (err) {
        setStatus("error")
      }
    }
    loadModels()
  }, [status])

  return status
}