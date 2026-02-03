import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';

interface TryOnScreenProps {
  onBack: () => void;
}

export default function TryOnScreen({ onBack }: TryOnScreenProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topOverlay}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.center}>
        <Text style={styles.message}>Try-On removed in simplified app. Use the camera from the landing screen.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topOverlay: { position: 'absolute', top: 0, left: 0, right: 0, padding: 16, zIndex: 10 },
  backButton: { padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, alignSelf: 'flex-start', marginTop: 10 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: { color: '#fff', textAlign: 'center', paddingHorizontal: 20 },
});
