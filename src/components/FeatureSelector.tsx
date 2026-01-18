import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export type FeatureType = 'none' | 'lipstick' | 'beard' | 'hair' | 'piercing';

interface FeatureSelectorProps {
    selectedFeature: FeatureType;
    onSelectFeature: (feature: FeatureType) => void;
}

const features: { id: FeatureType; label: string }[] = [
    { id: 'none', label: 'None' },
    { id: 'lipstick', label: 'Lipstick' },
    { id: 'beard', label: 'Beard' },
    { id: 'hair', label: 'Hair' },
    { id: 'piercing', label: 'Piercing' },
];

export default function FeatureSelector({ selectedFeature, onSelectFeature }: FeatureSelectorProps) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {features.map((feature) => (
                    <TouchableOpacity
                        key={feature.id}
                        style={[styles.button, selectedFeature === feature.id && styles.selectedButton]}
                        onPress={() => onSelectFeature(feature.id)}
                    >
                        <Text style={[styles.text, selectedFeature === feature.id && styles.selectedText]}>
                            {feature.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    selectedButton: {
        backgroundColor: '#fff',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
    },
    selectedText: {
        color: '#000',
    },
});
