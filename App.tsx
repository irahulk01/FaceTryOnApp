import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LandingScreen from './src/screens/LandingScreen';
import TryOnScreen from './src/screens/TryOnScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'tryon'>('landing');

  if (currentScreen === 'tryon') {
    return (
      <View style={styles.container}>
        <TryOnScreen onBack={() => setCurrentScreen('landing')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LandingScreen onStartCamera={() => setCurrentScreen('tryon')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
