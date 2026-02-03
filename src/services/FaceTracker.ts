// FaceTracker stub - face-detector removed

export type FaceData = any; // simplified placeholder

export interface FaceTrackerConfig {
  mode?: 'fast' | 'accurate';
  detectLandmarks?: 'none' | 'all';
  runClassifications?: 'none' | 'all';
  minDetectionInterval?: number;
  tracking?: boolean;
}

export const defaultFaceTrackerConfig: FaceTrackerConfig = {
  mode: 'fast',
  detectLandmarks: 'none',
  runClassifications: 'none',
  minDetectionInterval: 100,
  tracking: false,
};
