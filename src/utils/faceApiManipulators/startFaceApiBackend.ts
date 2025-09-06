import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs';

export async function initFaceApi() {
  await tf.setBackend('webgl');
  await tf.ready();

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ]);

  console.log('FaceAPI carregado com sucesso');
}