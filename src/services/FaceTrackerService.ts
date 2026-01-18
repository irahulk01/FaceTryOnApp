import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { FaceData as LegacyFaceData } from './FaceTracker'; // Keep existing type for compatibility

// Initialize TensorFlow
export const initTensorFlow = async () => {
    await tf.ready();
    console.log('TensorFlow.js is ready');
};

let detector: faceLandmarksDetection.FaceLandmarksDetector | null = null;

// Load Face Landmarks Model (MediaPipe Face Mesh)
export const loadFaceModel = async () => {
    try {
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig = {
            runtime: 'tfjs',
            refineLandmarks: true, // Crucial for lips and eyes
            maxFaces: 1,
        };
        detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        console.log('Face Landmarks Model loaded');
        return detector;
    } catch (error) {
        console.error('Error loading face model:', error);
        return null;
    }
};

export const detectFaces = async (imageTensor: any): Promise<LegacyFaceData[]> => {
    if (!detector) return [];

    try {
        const faces = await detector.estimateFaces(imageTensor);

        return faces.map((face: any) => {
            // Map Keypoints to our Legacy FaceData structure
            // MediaPipe FaceMesh returns 'keypoints' array with x,y,z

            const keypoints = face.keypoints;

            // Helper to find point by index or name (if names avail, but usually indices in mesh)
            // Lips indices (subset): 
            // 61: mouth corner left, 291: mouth corner right
            // 0: upper lip top, 17: lower lip bottom

            const getPoint = (index: number) => {
                const p = keypoints[index];
                if (p) return { x: p.x, y: p.y };
                return { x: 0, y: 0 };
            };

            return {
                bounds: {
                    origin: { x: face.box.xMin, y: face.box.yMin },
                    size: { width: face.box.width, height: face.box.height },
                },
                // Map approximate landmarks for compatibility
                leftEyePosition: getPoint(159), // Approx left eye center
                rightEyePosition: getPoint(386), // Approx right eye center

                // For lipstick, we pass specific points via these properties 
                // or we might need to extend FaceData if we want the full polygon.
                // But for now, let's map the "corners" and "bottom" as expected by FaceOverlay.
                leftMouthPosition: getPoint(61),
                rightMouthPosition: getPoint(291),
                bottomMouthPosition: getPoint(17),

                // We could also pass the full keypoints if we updated FaceData type, 
                // but let's stick to the interface FaceOverlay uses.
            } as LegacyFaceData;
        });
    } catch (error) {
        console.error("Face detection error:", error);
        return [];
    }
};
