import { Line, RoundedRect, Text, useFont } from "@shopify/react-native-skia";
import React, { JSX } from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
    price: number;
    y: number;
    color?: string;
}

const CurrentPriceLine = ({ price, y, color = "#ff4d4f" }: Props) => {
    const font = useFont(require("./fonts/Roboto_Condensed-Regular.ttf"), 12); // tuỳ bạn

    const labelWidth = 60;
    const labelHeight = 24;

    const now = new Date();
    const timeStr = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    // 🧱 Tạo vạch đứt quãng thủ công
    const dashWidth = 6;
    const gapWidth = 4;
    const segments: JSX.Element[] = [];

    for (let x = 0; x < width; x += dashWidth + gapWidth) {
        segments.push(
            <Line
                key={`dash-${x}`}
                p1={{ x, y }}
                p2={{ x: x + dashWidth, y }}
                color={"#ff4d507f"}
                strokeWidth={1}
            />
        );
    }

    return (
        <>
            {/* Dotted or solid line */}
            {segments}

            {/* Label box */}
            <RoundedRect
                x={width - labelWidth + 10}
                y={y - (labelHeight / 2) + 4}
                width={labelWidth - 10}
                height={labelHeight - 8}
                r={4}
                color={color}
            />

            {/* Text in label */}
            {font && (
                <Text
                    x={width - labelWidth + 14}
                    y={y + 4}
                    text={price.toFixed(2)}
                    color="white"
                    font={font}
                />
            )}
        </>
    );
};

export default CurrentPriceLine;
