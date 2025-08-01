// TypicalPriceLine.tsx
import { Path, Skia, SkPath } from '@shopify/react-native-skia';
import React from 'react';
import { Candle } from './types';

interface Props {
    candles: Candle[];
    data: any; // Mảng giá typical
    width: number;
    height: number;
    scale: number;
    translateX: number;
    max: number;
    min: number;
    color?: string;
}

const TypicalPriceLine = ({
    candles,
    data,
    width,
    height,
    scale,
    translateX,
    max,
    min,
    color
}: Props) => {
    const path: SkPath = Skia.Path.Make();
    let started = false;

    for (let i = 0; i < candles.length; i++) {
        const x = i * scale + translateX + scale / 2;
        const y = height * (1 - (data[i] - min) / (max - min));

        if (x < -10 || x > width + 10 || isNaN(y)) continue;

        if (!started) {
            path.moveTo(x, y);
            started = true;
        } else {
            path.lineTo(x, y);
        }
    }

    return <Path path={path} strokeWidth={1.5} color={color} style="stroke" />;
};

export default TypicalPriceLine;