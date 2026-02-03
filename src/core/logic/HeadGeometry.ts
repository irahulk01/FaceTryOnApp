// HeadGeometry simplified stub (face detection removed)

export interface HeadOrientation {
  yaw: number;
  pitch: number;
  roll: number;
}

export const calculateHeadOrientation = (_face?: any): HeadOrientation => ({ yaw: 0, pitch: 0, roll: 0 });
export const isFaceStable = (_history: HeadOrientation[]): boolean => true; 
