import React from 'react';
import { View } from 'react-native';

interface FaceOverlayProps {
  faces?: any[];
  cameraWidth?: number;
  cameraHeight?: number;
  selectedFeature?: string;
  intensity?: number;
}

export default function FaceOverlay(_: FaceOverlayProps) {
  // Overlay disabled in simplified app
  return <View />;
} 
