import React from 'react';
import { Candle } from './types';
import { Group, Line } from '@shopify/react-native-skia';

interface Props {
    candles: Candle[];
    width: number;
    height: number;
    translateX: number;
    scale: number;
}

const DividerLines = ({ candles, width, height, translateX, scale }: Props) => {
    const step = 24 * 60 * 60; // 1 ngày
    const lines = candles.filter(c => new Date(c.timestamp * 1000).getUTCHours() === 7);

    return (
        <Group>
            {lines.map((candle, i) => {
                const x = (i + translateX) * scale;
                if (x < 0 || x > width) return null;
                return (
                    <Line
                        key={i}
                        p1={{ x, y: 0 }}
                        p2={{ x, y: height }}
                        color="#444"
                        strokeWidth={1}
                    />
                );
            })}
        </Group>
    );
};

export default DividerLines;
