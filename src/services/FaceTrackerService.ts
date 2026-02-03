// FaceTrackerService stub (face detection removed)
// This file intentionally provides minimal, safe stubs so the app can run
// without TensorFlow or face detection dependencies.

export interface FaceData {
  bounds?: { origin: { x: number; y: number }; size: { width: number; height: number } };
  keypoints?: { x: number; y: number; name?: string }[];
  leftEyePosition?: { x: number; y: number };
  rightEyePosition?: { x: number; y: number };
  leftMouthPosition?: { x: number; y: number };
  rightMouthPosition?: { x: number; y: number };
  bottomMouthPosition?: { x: number; y: number };
}

export const initTensorFlow = async () => {
  // No-op stub
  console.log('initTensorFlow: stub (face detection removed)');
};

export const loadFaceModel = async () => {
  // No model to load in the simplified app
  return null;
};

export const detectFaces = async (_imageTensor: any, _scaleX: number = 1, _scaleY: number = 1): Promise<FaceData[]> => {
  return [];
};
