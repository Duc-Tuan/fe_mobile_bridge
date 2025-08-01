import React from 'react';
import { Line } from '@shopify/react-native-skia';

interface Props {
    x: number;
    y: number;
    width: number;
    height: number;
    dashLength?: number;
    gap?: number;
}

const DashedLine = ({
    p1,
    p2,
    dashLength = 4,
    gap = 4,
    color = "#888",
    isVertical = false,
}: {
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    dashLength?: number;
    gap?: number;
    color?: string;
    isVertical?: boolean;
}) => {
    const lines = [];

    const totalLength = isVertical
        ? Math.abs(p2.y - p1.y)
        : Math.abs(p2.x - p1.x);
    const count = Math.floor(totalLength / (dashLength + gap));

    for (let i = 0; i < count; i++) {
        const offset = i * (dashLength + gap);
        if (isVertical) {
            lines.push(
                <Line
                    key={i}
                    p1={{ x: p1.x, y: p1.y + offset }}
                    p2={{ x: p1.x, y: p1.y + offset + dashLength }}
                    strokeWidth={1}
                    color={color}
                />
            );
        } else {
            lines.push(
                <Line
                    key={i}
                    p1={{ x: p1.x + offset, y: p1.y }}
                    p2={{ x: p1.x + offset + dashLength, y: p1.y }}
                    strokeWidth={1}
                    color={color}
                />
            );
        }
    }

    return <>{lines}</>;
};

const Crosshair = ({ x, y, width, height }: Props) => {
    return (
        <>
            {/* Vertical dashed line */}
            <DashedLine
                p1={{ x, y: 0 }}
                p2={{ x, y: height }}
                isVertical
                dashLength={6}
                gap={4}
                color="#888"
            />
            {/* Horizontal dashed line */}
            <DashedLine
                p1={{ x: 0, y }}
                p2={{ x: width, y }}
                isVertical={false}
                dashLength={6}
                gap={4}
                color="#888"
            />
        </>
    );
};

export default Crosshair;
