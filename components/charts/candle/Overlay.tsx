import React from 'react';
import { Dimensions } from 'react-native';
import {
  Group,
  RoundedRect,
  Text,
  useFont,
} from '@shopify/react-native-skia';

const { width } = Dimensions.get('window');

interface OverlayProps {
  x: number | null;
  y: number | null;
  tooltipY: number;
  color: string;
  candleHover: any;
  colorText:string
}
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const Overlay = ({ x, y, tooltipY, color, candleHover, colorText }: OverlayProps) => {
  if (x === null || y === null) return null;

  const font = useFont(require('./fonts/Roboto_Condensed-Regular.ttf'), 14);
  if (!font) return null;

  const price = candleHover ? candleHover.close : 0;
  const candle = candleHover;

  if (!candle) return null;

  // Format giá 5 chữ số
  const open = candleHover.open.toFixed(2);
  const high = candleHover.high.toFixed(2);
  const low = candleHover.low.toFixed(2);
  const close = candleHover.close.toFixed(2);
  const change = (candleHover.close - candleHover.open).toFixed(2);
  const percentChange = (
    ((candleHover.close - candleHover.open) / candleHover.open) * 100
  ).toFixed(2);

  const changeText = `${change} (${percentChange}%)`;
  const changeColor = candleHover.close >= candleHover.open ? '#4caf50' : '#e53935';

  const mainText = `O:${open} H:${high} L:${low} C:${close}`;
  const boxWidth = font.getTextWidth(mainText + '  ' + changeText) + 8;
  const boxHeight = 24;

  return (
    <Group>
      {/* Tooltip giá bên phải */}
      <RoundedRect
        x={width - 64}
        y={y - 10}
        width={60}
        height={20}
        r={4}
        color={color}
      />
      <Text
        x={width - 60}
        y={y + 5}
        text={`$${price.toFixed(2)}`}
        color="white"
        font={font}
      />

      {/* Tooltip thời gian dưới */}
      <RoundedRect
        x={x - 60}
        y={tooltipY}
        width={126}
        height={20}
        r={4}
        color={color}
      />
      <Text
        x={x - 56}
        y={tooltipY + 15}
        text={formatDate(candle.timestamp)}
        color="white"
        font={font}
      />

      {/* ✅ Chi tiết cây nến - dạng 1 dòng ngang */}
      <RoundedRect
        x={0}
        y={0}
        width={boxWidth}
        height={boxHeight}
        r={4}
        color="rgba(31, 31, 31, 0)"
      />
      <Group>
        <Text
          x={4}
          y={16}
          text={mainText}
          color={colorText}
          font={font}
        />
        <Text
          x={30 + font.getTextWidth(mainText)}
          y={16}
          text={`  ${changeText}`}
          color={changeColor}
          font={font}
        />
      </Group>
    </Group >
  );
};

