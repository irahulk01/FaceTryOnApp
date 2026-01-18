import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, Polygon } from 'react-native-svg';
import { FaceData } from '../services/FaceTracker';
import { FeatureType } from './FeatureSelector';

interface FaceOverlayProps {
    faces: FaceData[];
    cameraWidth: number;
    cameraHeight: number;
    selectedFeature: FeatureType;
    intensity: number;
}

export default function FaceOverlay({ faces, cameraWidth, cameraHeight, selectedFeature, intensity }: FaceOverlayProps) {
    if (faces.length === 0) return null;

    const renderLipstick = (face: FaceData) => {
        // Basic approximation using available landmarks from expo-face-detector
        if (!face.leftMouthPosition || !face.rightMouthPosition || !face.bottomMouthPosition) return null;

        const left = face.leftMouthPosition;
        const right = face.rightMouthPosition;
        const bottom = face.bottomMouthPosition;
        const centerX = (left.x + right.x) / 2;
        const centerY = (left.y + right.y) / 2;

        // Approximation: top point mirrors bottom distance somewhat
        const top = { x: centerX, y: centerY - (bottom.y - centerY) * 0.5 };

        const points = `${left.x},${left.y} ${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y}`;

        return (
            <Polygon
                points={points}
                fill={`rgba(200, 0, 50, ${intensity * 0.8})`}
                stroke="none"
            />
        );
    };

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg height="100%" width="100%" viewBox={`0 0 ${cameraWidth} ${cameraHeight}`}>
                {faces.map((face, index) => (
                    <React.Fragment key={index}>
                        {selectedFeature === 'lipstick' && renderLipstick(face)}
                        {selectedFeature === 'none' && (
                            <Rect
                                x={face.bounds.origin.x}
                                y={face.bounds.origin.y}
                                width={face.bounds.size.width}
                                height={face.bounds.size.height}
                                stroke="red"
                                strokeWidth="2"
                                fill="transparent"
                            />
                        )}
                    </React.Fragment>
                ))}
            </Svg>
        </View>
    );
}
