import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Use CameraView
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { initTensorFlow, loadFaceModel, detectFaces } from '../services/FaceTrackerService';
import { FaceData } from '../services/FaceTracker';
import { ExpoWebGLRenderingContext } from 'expo-gl';

interface CameraViewProps {
    onFacesDetected: (faces: FaceData[]) => void;
}

// Wrap CameraView with Tensor provider
const TensorCamera = cameraWithTensors(CameraView);

export default function AppCameraView({ onFacesDetected }: CameraViewProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<'front' | 'back'>('front');
    const [isModelReady, setIsModelReady] = useState(false);

    // We need to keep a ref to manage the loop interactions
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    useEffect(() => {
        const prepare = async () => {
            await initTensorFlow();
            await loadFaceModel();
            setIsModelReady(true);
        };
        prepare();

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    const handleCameraStream = (
        images: IterableIterator<tf.Tensor3D>,
        updatePreview: () => void,
        gl: ExpoWebGLRenderingContext
    ) => {
        const loop = async () => {
            if (!images) return; // Safety check

            try {
                const next = images.next();
                if (next.done) return;

                const imageTensor = next.value;

                // Detect faces
                if (isModelReady) {
                    // We use the service to get faces
                    const faces = await detectFaces(imageTensor);
                    // Map to FaceData expected by overlay is done in service
                    onFacesDetected(faces);
                }

                // Dispose tensor to avoid memory leaks!
                tf.dispose([imageTensor]);

            } catch (e) {
                console.error("Error in loop", e);
            }

            // Schedule next frame
            rafId.current = requestAnimationFrame(loop);
        };

        loop();
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            </View>
        );
    }

    if (!isModelReady) {
        return (
            <View style={styles.container}>
                {/* Fallback while loading model */}
                <CameraView style={styles.camera} facing={facing} />
                <View style={styles.loadingOverlay}>
                    <Text style={styles.loadingText}>Loading Face Model...</Text>
                </View>
            </View>
        );
    }

    const { width, height } = Dimensions.get('window');
    // TensorCamera config
    // We match the texture size to the view size for simplicity, or smaller for performance
    const textureDims = Platform.OS === 'ios' ? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };

    return (
        <View style={styles.container}>
            <TensorCamera
                style={styles.camera}
                facing={facing}
                onCameraReady={() => console.log('Camera ready')}

                // TFJS Props
                cameraTextureHeight={textureDims.height}
                cameraTextureWidth={textureDims.width}
                resizeHeight={200} // Downscale for faster detection
                resizeWidth={150} // Downscale for faster detection ratio should act aspect ratio
                resizeDepth={3}
                onReady={handleCameraStream}
                autorender={true}
                useCustomShadersToResize={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    loadingOverlay: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    }
});
