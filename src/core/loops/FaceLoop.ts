// FaceLoop stub - no-op implementation

interface FaceLoopConfig {
  onFacesDetected?: (faces: any[]) => void;
  scaleX?: number;
  scaleY?: number;
}

export const startFaceLoop = (_images: any, _config: FaceLoopConfig, _isModelReady?: boolean) => {
  let isRunning = true;
  const stop = () => { isRunning = false; };
  return stop;
};
