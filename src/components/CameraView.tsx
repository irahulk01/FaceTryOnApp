import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CameraViewProps {
  onFacesDetected?: (faces: any[]) => void;
}

export default function AppCameraView(_: CameraViewProps) {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Camera view removed. Use the Camera button from the landing screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  placeholderText: { color: '#fff', textAlign: 'center', paddingHorizontal: 20 },
});
