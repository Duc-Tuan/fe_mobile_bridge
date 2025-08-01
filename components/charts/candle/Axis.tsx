import React from 'react';
import { Group, Line, Rect, Text, useFont } from '@shopify/react-native-skia';

interface Props {
    width: number;
    height: number;
    max: number;
    min: number;
    scaleY: number;
    colorText: string;
    backgroud: string;
    colorLine: string;
}

const bottomPadding = 12;

const Axis = ({ width, height, max, min, scaleY, colorText, backgroud, colorLine }: Props) => {
    const font = useFont(require('./fonts/Roboto_Condensed-Regular.ttf'), 12);
    if (!font) return null;

    const baseLevels = 20;
    const levels = Math.min(Math.max(Math.round(baseLevels * scaleY), 3), 20); // giữ trong khoảng 3–20 mức
    const step = (max - min) / (levels - 1);

    const axisWidth = 46;
    const axisX = width - axisWidth;
    return (
        <Group>
            <Line
                p1={{ x: axisX, y: 0 }}
                p2={{ x: axisX, y: height }}
                strokeWidth={1}
                color={colorLine}
            />

            {/* ✅ Nền của trục Y */}
            <Rect x={width - 46} y={0} width={50} height={height} color={backgroud} />

            {[...Array(levels)].map((_, i) => {
                const y = ((height - bottomPadding) / (levels - 1)) * i;
                const price = max - step * i;
                return (
                    <Text
                        key={i}
                        x={width - 38}
                        y={y + 12}
                        text={price.toFixed(2)}
                        color={colorText}
                        font={font}
                    />
                );
            })}
        </Group>
    );
};

export default Axis;
