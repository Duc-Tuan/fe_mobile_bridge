
import MainChart from '@/components/charts/candle/MainChart';
import { Candle } from '@/components/charts/candle/types';
import { useTheme } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import mockData from '../../../assets/data/mockData.json';
import { useNavigation } from 'expo-router';
import HeaderWithAnimation from '@/app/(pages)/header/headerWithAnimation';
import { Text } from '@/components/Themed';
import BodyWithAnimation from '@/app/(pages)/main';
import { useAppInfo } from '@/hooks/useAppInfo';
import { ScrollView } from 'react-native';
import Emtylogin from '@/app/(pages)/emtylogin';

export default function ChartScreen() {
    const { t, colors, user } = useAppInfo()
    const [candles, setCandles] = useState<Candle[]>(mockData);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <HeaderWithAnimation>
                    <Text style={{ color: "white", fontWeight: '600', fontSize: 18 }}>{t('Biểu đồ')}</Text>
                </HeaderWithAnimation>)
        });
    }, [navigation]);

    const handleChange = (data: boolean) => {
        console.log("handleChange: ", data);
    }

    return (
        <BodyWithAnimation>
            {user ?
                <MainChart data={candles} onLoadingData={handleChange} colors={colors} />
                :
                <Emtylogin />
            }
        </BodyWithAnimation>
    );
}