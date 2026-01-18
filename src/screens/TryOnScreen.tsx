import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppCameraView from '../components/CameraView';
import FaceOverlay from '../components/FaceOverlay';
import FeatureSelector, { FeatureType } from '../components/FeatureSelector';
import IntensitySlider from '../components/IntensitySlider';
import { FaceData } from '../services/FaceTracker';


interface TryOnScreenProps {
    onBack: () => void;
}

export default function TryOnScreen({ onBack }: TryOnScreenProps) {
    const [faces, setFaces] = useState<FaceData[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<FeatureType>('none');
    const [intensity, setIntensity] = useState<number>(0.5);

    const handleFacesDetected = (detectedFaces: FaceData[]) => {
        setFaces(detectedFaces);
    };

    return (
        <View style={styles.container}>
            {/* Camera View */}
            <AppCameraView onFacesDetected={handleFacesDetected} />

            {/* Face Overlay (AR) */}
            <FaceOverlay
                faces={faces}
                cameraWidth={1080}
                cameraHeight={1920}
                selectedFeature={selectedFeature}
                intensity={intensity}
            />

            {/* Back Button Overlay */}
            <SafeAreaView style={styles.topOverlay}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* UI Controls */}
            {selectedFeature !== 'none' && (
                <IntensitySlider value={intensity} onValueChange={setIntensity} />
            )}

            <FeatureSelector
                selectedFeature={selectedFeature}
                onSelectFeature={setSelectedFeature}
            />

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
        zIndex: 10,
    },
    backButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
