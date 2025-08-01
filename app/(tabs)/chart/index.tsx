
import MainChart from '@/components/charts/candle/MainChart';
import { Candle } from '@/components/charts/candle/types';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import mockData from '../../../assets/data/mockData.json';

export default function ChartScreen() {
    const { colors } = useTheme();
    const [candles, setCandles] = useState<Candle[]>(mockData);

    const handleChange = (data: boolean) => {
        console.log("handleChange: ", data);
    }

    return (
        <MainChart data={candles} onLoadingData={handleChange} colors={colors} />
    );
}