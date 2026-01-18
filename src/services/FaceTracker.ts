import { FaceFeature } from 'expo-face-detector';

export type FaceData = FaceFeature;

export interface FaceTrackerConfig {
    mode?: 'fast' | 'accurate';
    detectLandmarks?: 'none' | 'all';
    runClassifications?: 'none' | 'all';
    minDetectionInterval?: number;
    tracking?: boolean;
}

export const defaultFaceTrackerConfig: FaceTrackerConfig = {
    mode: 'fast',
    detectLandmarks: 'all',
    runClassifications: 'all',
    minDetectionInterval: 100,
    tracking: true,
};
