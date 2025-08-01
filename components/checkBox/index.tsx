import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface IProps {
    onPress: () => void
    isCheck: boolean
}

const CheckBox = ({ onPress, isCheck }: IProps) => {
    const { colors }: any = useTheme();
    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={isCheck ? '#fff' : '#f4f3f4'}
                style={{ transform: [{ scale: 0.7 }] }} // 👈 thu nhỏ Switch
                value={isCheck}
                onValueChange={onPress}
            />
            <Text style={{
                fontSize: 16,
                color: colors.text,
            }}>Hiện đường MA</Text>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
});

export default CheckBox;
