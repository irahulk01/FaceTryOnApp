import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
    const [clicked, setClicked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Clean Camera App</Text>
                    <Text style={styles.description}>
                        A minimal app: press the button below.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => setClicked(true)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>CLICK ME</Text>
                    </TouchableOpacity>

                    {clicked && <Text style={styles.clickedText}>Clicked</Text>}
                </View>
            </View>

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
    clickedText: {
        color: '#fff',
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
    },
});
