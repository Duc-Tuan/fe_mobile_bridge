import { Group, Rect } from "@shopify/react-native-skia";
import { Candle } from "./types";

interface Props {
  candles: Candle[];
  width: number;
  height: number;
  chartHeight: number;
  scale: number;
  translateX: number;
  yOffset?: number; // mới thêm
}

const VolumeChart = ({ candles, width, height, scale, translateX, yOffset = 0 }: Props) => {
  const maxVolume = Math.max(...candles.map((c) => c.volume));

  return (
    <Group>
      {candles.map((c, i) => {
        const x = i * scale + translateX;
        if (x < -10 || x > width + 10) return null;

        const volHeight = (c.volume / maxVolume) * height;
        const y = yOffset + height - volHeight;

        const color = c.close >= c.open ? "rgba(76, 175, 79, 0.3)" : "rgba(229, 56, 53, 0.3)";

        return (
          <Rect
            key={i}
            x={x}
            y={y}
            width={scale * 0.6}
            height={volHeight}
            color={color}
          />
        );
      })}
    </Group>
  );
};

export default VolumeChart;