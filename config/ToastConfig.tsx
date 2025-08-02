// ToastConfig.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const toastConfig = {
    success: ({ text1, text2, ...rest }: any) => (
        <View style={styles.toastContainer}>
            <Text style={styles.text1}>{text1}</Text>
            {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
        </View>
    ),
    error: ({ text1, text2, ...rest }: any) => (
        <View style={[styles.toastContainer, { backgroundColor: '#fee2e2' }]}>
            <Text style={[styles.text1, { color: '#dc2626' }]}>{text1}</Text>
            {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        backgroundColor: '#e0fce8',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: 'center', // ✅ width auto theo nội dung
        marginHorizontal: 16,
        elevation: 3,
        marginTop: -12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    text1: {
        fontSize: 12,
        fontWeight: '500',
    },
    text2: {
        fontSize: 12,
        color: '#444',
    },
});
