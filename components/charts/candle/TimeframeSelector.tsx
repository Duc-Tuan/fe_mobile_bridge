// components/TimeframeSelector.tsx
import React, { useState, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';

const TIMEFRAMES = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1', 'MN'];

type Props = {
    selected: string;
    onSelect: (tf: string) => void;
    backgroundColor: string;
    tint: string;
};

export const TimeframeSelector: React.FC<Props> = ({ selected, onSelect, backgroundColor, tint }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const buttonRef = useRef<View>(null);
    const screenWidth = Dimensions.get('window').width;

    const handleSelect = (tf: string) => {
        onSelect(tf);
        setIsExpanded(false);
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                ref={buttonRef}
                onPress={() => setIsExpanded(true)}
                style={[styles.compactButton, { backgroundColor: tint }]}
            >
                <Text style={styles.compactText}>{selected}</Text>
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.overlayMenu, { width: screenWidth, backgroundColor: backgroundColor }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {TIMEFRAMES.map((tf) => {
                            const isSelected = tf === selected;
                            return (
                                <TouchableOpacity
                                    key={tf}
                                    onPress={() => handleSelect(tf)}
                                    style={[styles.menuButton, isSelected && { backgroundColor: tint }]}
                                >
                                    <Text style={[styles.menuText, isSelected && styles.textSelected]}>
                                        {tf}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 10,
    },
    compactButton: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    compactText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
    overlayMenu: {
        position: 'absolute',
        top: -10,
        left: -20,
        elevation: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        zIndex: 999,
    },
    menuButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 4,
    },
    menuText: {
        color: '#000',
        fontWeight: '500',
    },
    textSelected: {
        color: '#fff',
    },
});
