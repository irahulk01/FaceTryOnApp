import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface LandingScreenProps {
    onStartCamera: () => void;
}

const { width } = Dimensions.get('window');

export default function LandingScreen({ onStartCamera }: LandingScreenProps) {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>VIRTUAL</Text>
                    <Text style={styles.subtitle}>Face Try-On</Text>
                    <View style={styles.divider} />
                    <Text style={styles.description}>
                        Experience your new look in real-time. Experiment with styles instantly.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={onStartCamera}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>OPEN CAMERA</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Decorative Circles */}
            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    contentContainer: {
        zIndex: 10,
        alignItems: 'center',
        paddingHorizontal: 40,
        width: '100%',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    title: {
        fontSize: 42,
        fontWeight: '300',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1,
        marginTop: -10,
    },
    divider: {
        width: 40,
        height: 4,
        backgroundColor: '#4A90E2', // Blue accent
        marginVertical: 20,
        borderRadius: 2,
    },
    description: {
        textAlign: 'center',
        color: '#888888',
        fontSize: 16,
        lineHeight: 24,
        maxWidth: 300,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.1,
    },
    circle1: {
        width: width * 1.2,
        height: width * 1.2,
        backgroundColor: '#4A90E2',
        top: -width * 0.4,
        right: -width * 0.3,
    },
    circle2: {
        width: width,
        height: width,
        backgroundColor: '#9013FE',
        bottom: -width * 0.3,
        left: -width * 0.2,
    },
});
