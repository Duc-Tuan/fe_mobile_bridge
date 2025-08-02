import { ScrollView, useColorScheme } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import HeaderWithAnimation from '@/app/(pages)/header/headerWithAnimation';
import BodyWithAnimation from '@/app/(pages)/main';
import { useAppInfo } from '@/hooks/useAppInfo';
import Emtylogin from '@/app/(pages)/emtylogin';

export default function TransactionScreen() {
    const { t, colors, user } = useAppInfo()
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
            <ScrollView>
                {user ?
                    <Text style={{ color: colors.text }}>TransactionScreen</Text>
                    :
                    <Emtylogin />
                }
            </ScrollView>
        </BodyWithAnimation>
    );
}