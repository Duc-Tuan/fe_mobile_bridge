import { useColorScheme } from 'react-native';

import { Text } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import HeaderWithAnimation from '@/app/(pages)/header/headerWithAnimation';
import BodyWithAnimation from '@/app/(pages)/main';
import { useAppInfo } from '@/hooks/useAppInfo';

export default function TransactionScreen() {
    const { t, colors } = useAppInfo()
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <HeaderWithAnimation>
                    <Text style={{ color: "white", fontWeight: '600', fontSize: 18 }}>{t('Giao dịch')}</Text>
                </HeaderWithAnimation>)
        });
    }, [navigation]);
    return (
        <BodyWithAnimation>
            <Text style={{ color: colors.text }}>Transaction</Text>
        </BodyWithAnimation>
    );
}