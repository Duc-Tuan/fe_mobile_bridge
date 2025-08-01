import React from "react";
import { Group, Path, Skia } from "@shopify/react-native-skia";

interface GridProps {
    width: number;
    height: number;
    verticalLines: number;
    horizontalLines: number;
    dashLength?: number;
    gapLength?: number;
    color?: string;
}

const createDashedLinePath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    dash: number,
    gap: number
) => {
    const path = Skia.Path.Make();
    const isVertical = x1 === x2;
    const length = isVertical ? y2 - y1 : x2 - x1;
    const count = Math.floor(length / (dash + gap));

    for (let i = 0; i < count; i++) {
        const offset = i * (dash + gap);
        if (isVertical) {
            path.moveTo(x1, y1 + offset);
            path.lineTo(x1, y1 + offset + dash);
        } else {
            path.moveTo(x1 + offset, y1);
            path.lineTo(x1 + offset + dash, y1);
        }
    }

    return path;
};

const Grid = ({
    width,
    height,
    verticalLines,
    horizontalLines,
    dashLength = 4,
    gapLength = 4,
    color,
}: GridProps) => {
    const vSpacing = width / verticalLines;
    const hSpacing = height / horizontalLines;

    const vPaths = Array.from({ length: verticalLines }, (_, i) =>
        createDashedLinePath(i * vSpacing, 0, i * vSpacing, height, dashLength, gapLength)
    );

    const hPaths = Array.from({ length: horizontalLines }, (_, i) =>
        createDashedLinePath(0, i * hSpacing, width, i * hSpacing, dashLength, gapLength)
    );

    return (
        <Group>
            {vPaths.map((path, i) => (
                <Path key={`v-${i}`} path={path} color={color} style="stroke" strokeWidth={1} />
            ))}
            {hPaths.map((path, i) => (
                <Path key={`h-${i}`} path={path} color={color} style="stroke" strokeWidth={1} />
            ))}
        </Group>
    );
};

export default Grid;
