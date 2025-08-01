import React from 'react';
import { Candle } from './types';
import { Group, Line, Rect } from '@shopify/react-native-skia';

interface Props {
    candles: Candle[];
    width: number;
    height: number;
    translateX: number;
    scale: number;
    max: number;
    min: number;
    hoveredIndex?: any;
    isFrozen: boolean
}

const CandleChart = ({ candles, width, height, translateX, scale, max, min, hoveredIndex, isFrozen }: Props) => {
    const priceToY = (price: number) => {
        return (height * (1 - (price - min) / (max - min)));
    };

    const candleWidth = Math.max(1, scale * 0.7); // Tự động theo scale

    return (
        <Group>
            {candles.map((c, i) => {
                const x = i * scale + translateX;
                if (x < -10 || x > width + 10) return null;

                const openY = priceToY(c.open);
                const closeY = priceToY(c.close);
                const highY = priceToY(c.high);
                const lowY = priceToY(c.low);

                const actualColor = (() => {
                    const baseColor = c.close >= c.open ? "#02dfc9" : "#ff5b5b";

                    if (isFrozen && hoveredIndex !== null) {
                        if (i === candles.length - 1 - hoveredIndex) {
                            return baseColor; // Cây đang được hover — giữ nguyên màu
                        } else {
                            return `${baseColor}40`; // Cây khác — làm mờ (40 = 25% opacity)
                        }
                    }

                    return baseColor;
                })();

                return (
                    <Group key={i}>
                        {/* Wick (bóng nến) */}
                        <Line
                            p1={{ x: x + candleWidth / 2, y: highY }}
                            p2={{ x: x + candleWidth / 2, y: lowY }}
                            color={actualColor}
                            strokeWidth={1}
                        />
                        {/* Body (thân nến) */}
                        <Rect
                            x={x}
                            y={Math.min(openY, closeY)}
                            width={candleWidth}
                            height={Math.abs(closeY - openY)}
                            color={actualColor}
                        />
                    </Group>
                );
            })}
        </Group>
    );
};

export default CandleChart;
