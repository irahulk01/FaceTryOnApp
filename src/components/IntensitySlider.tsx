import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import Slider from '@react-native-community/slider';

interface IntensitySliderProps {
    value: number;
    onValueChange: (value: number) => void;
    label?: string;
}

export default function IntensitySlider({ value, onValueChange, label = 'Intensity' }: IntensitySliderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={value}
                onValueChange={onValueChange}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 120, // Above feature selector
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        padding: 10,
    },
    label: {
        color: 'white',
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
});
