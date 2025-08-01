import { Group, Line, Path, Skia, Text, useFont } from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { Candle } from "./types";

interface TimeScaleProps {
    candles: Candle[];
    width: number;
    chartHeight: number;
    scale: number;
    translateX: number;
    chartWidth: number;
    colorText: string;
    colorLine: string;
}

const TimeScale: React.FC<TimeScaleProps> = ({
    candles,
    width,
    chartHeight,
    scale,
    translateX,
    colorText,
    colorLine
}) => {
    const font = useFont(require("./fonts/Roboto_Condensed-Regular.ttf"), 12);
    const fontBold = useFont(require("./fonts/Roboto_Condensed-BoldItalic.ttf"), 12);
    if (!font || !fontBold) return null;

    const candleWidth = scale;
    const visibleCount = Math.floor(width / candleWidth);
    const startIndex = Math.max(0, Math.floor(-translateX / candleWidth) - 2);
    const endIndex = Math.min(startIndex + visibleCount + 4, candles.length);

    const labels: { x: number; label: string, date: Date }[] = [];
    const dayLabels: { x: number; day: string }[] = [];
    const separators: number[] = [];

    const formatDate = (date: Date): string => {
        const pad = (n: number) => n.toString().padStart(2, "0");

        if (scale > 60) {
            // Rất zoom gần -> hh:mm:ss
            return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        } else if (scale > 30) {
            // Zoom gần -> hh:mm
            return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        } else if (scale > 15) {
            // Trung bình -> thứ + ngày:tháng:năm
            const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            const weekday = weekdays[date.getDay()];
            const day = pad(date.getDate());
            const month = pad(date.getMonth() + 1);
            const year = date.getFullYear();
            return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
            return `${weekday} ${day}:${month}:${year}`;
        } else if (scale > 8) {
            // Xa hơn -> ngày/tháng/năm
            const day = pad(date.getDate());
            const month = pad(date.getMonth() + 1);
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } else {
            // Rất xa -> tuần + năm hoặc tháng/năm
            const onejan = new Date(date.getFullYear(), 0, 1);
            const week = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
            const year = date.getFullYear();
            return `Tuần ${week}, ${year}`;
            // Hoặc thay thế bằng:
            // return `${pad(date.getMonth() + 1)}/${year}`;
        }
    };


    const approxTextWidth = 40; // hoặc tùy chỉnh theo font
    const labelSpacing = Math.max(1, Math.ceil(approxTextWidth / scale));

    let prevLabel: string | null = null;

    for (let i = startIndex; i < endIndex; i++) {
        if (i % labelSpacing !== 0) continue;

        const candle = candles[i];
        const date = new Date(candle.timestamp * 1000);
        const x = i * candleWidth + translateX + 15;

        const label = formatDate(date);

        // Tránh hiển thị trùng label
        if (label === prevLabel) continue;
        prevLabel = label;

        // Kiểm tra tránh overlap bằng khoảng cách
        if (labels.length > 0 && Math.abs(x - labels[labels.length - 1].x) < 40) {
            continue;
        }

        labels.push({ x, label, date });

        // Separator at start of new day at 7h00
        if (date.getHours() === 7 && date.getMinutes() === 0) {
            separators.push(x);
        }
    }

    const pad = (n: number) => n.toString().padStart(2, '');

    // Hiển thị ngày đầu tiên
    if (labels.length > 0) {
        const firstDate = labels[0].date;
        dayLabels.push({
            x: labels[0].x,
            day: `${pad(firstDate.getDate())} th${pad(firstDate.getMonth() + 1)}`,
        });
    }

    // Hiển thị khi đổi ngày
    for (let i = 1; i < labels.length; i++) {
        const prev = labels[i - 1].date;
        const curr = labels[i].date;
        if (
            prev.getDate() !== curr.getDate() ||
            prev.getMonth() !== curr.getMonth() ||
            prev.getFullYear() !== curr.getFullYear()
        ) {
            const day = pad(curr.getDate());
            const month = pad(curr.getMonth() + 1);
            const midX = (labels[i - 1].x + labels[i].x) / 2;
            dayLabels.push({ x: midX, day: `${day} th${month}` });
        }
    }

    const dashLength = 7;
    const gapLength = 7;
    const totalLength = dashLength + gapLength;


    const Separators = scale >= 5
        ? separators.map((x, idx) => {
            const path = Skia.Path.Make();
            for (let y = 0; y < chartHeight; y += totalLength) {
                path.moveTo(x, y);
                path.lineTo(x, y + dashLength);
            }
            return (
                <Path
                    key={`path-${idx}`}
                    path={path}
                    color="#2f2f2fff"
                    style="stroke"
                    strokeWidth={0.5}
                />
            );
        })
        : null;

    return (
        <Group>
            <Line
                p1={{ x: 0, y: chartHeight }}
                p2={{ x: width - 50, y: chartHeight }}
                strokeWidth={1}
                color={colorLine}
            />

            {labels.map(({ x, label }, idx) => (
                <Text
                    key={`label-${idx}`}
                    x={x - font.getTextWidth(label) / 2}
                    y={chartHeight + 12}
                    text={label}
                    font={font}
                    color={colorText}
                />
            ))}

            {Separators}

            {scale > 15 && dayLabels.map(({ x, day }, idx) => (
                <Text
                    key={`day-${idx}`}
                    x={x - (font.getTextWidth(day) / 2)}
                    y={chartHeight + 24} // cùng hàng, nhưng thấp hơn 1 chút
                    text={day}
                    font={fontBold}
                    color={colorText}
                />
            ))}
        </Group>
    );
};

export default TimeScale;