import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, PanResponder, StyleSheet } from 'react-native';
import { Canvas, ClipOp, Group, Rect, Skia } from '@shopify/react-native-skia';
import { Text, View } from '@/components/Themed';
import CheckBox from '@/components/checkBox';

import Axis from './Axis';
import CandleChart from './CandleChart';
import Crosshair from './Crosshair';
import CurrentPriceLine from './CurrentPriceLine';
import DividerLines from './DividerLines';
import Grid from './Grid';
import { Overlay } from './Overlay';
import TimeScale from './TimeScale';
import VolumeChart from './VolumeChart';
import TypicalPriceLine from './TypicalPriceLine';
import { Candle, loadCandles, ReloadCandles } from './types';
import { TimeframeSelector } from './TimeframeSelector';
import { useTheme } from '@react-navigation/native';
import { styleGeneral } from '@/constants/StyleGeneral';
import { useAppInfo } from '@/hooks/useAppInfo';

interface IProps {
  data: Candle[];
  onLoadingData: (data: boolean) => void;
  colors: any
}

const { width, height } = Dimensions.get('window');
const CHART_HEIGHT = height * 0.73;
const VOLUME_HEIGHT = height * 0.1;
const TIME_AXIS_HEIGHT = height * 0.1;
const CHART_PADDING = 10;
const MAX_TRANSLATE_X = 60;
const MOVE_THRESHOLD = 10;

const distance = (touches: any[]) => {
  const [a, b] = touches;
  return Math.sqrt((a.pageX - b.pageX) ** 2 + (a.pageY - b.pageY) ** 2);
};

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(val, max));

const MainChart = ({ data, onLoadingData, colors }: IProps) => {
  const { t } = useAppInfo()
  const [showTypicalLine, setShowTypicalLine] = useState(true);
  const [scale, setScale] = useState(8);
  const [yScale, setYScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);
  const [lastPinchDistance, setLastPinchDistance] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState('M1');
  const [dataTimeframe, setDataTimeframe] = useState<Candle[]>(data);

  const [offset, setOffset] = useState(0); // Dùng để biết đang ở trang mấy
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const isFrozen = useRef(false);
  const longPressTimeout: any = useRef<NodeJS.Timeout | null>(null);
  const initialTouch = useRef({ x: 0, y: 0 });

  const candles = useMemo(() => dataTimeframe.slice(-200), [dataTimeframe]);

  const { rawMax, rawMin, center, range, max, min } = useMemo(() => {
    const rawMax = Math.max(...candles.map(c => c.high));
    const rawMin = Math.min(...candles.map(c => c.low));
    const center = (rawMax + rawMin) / 2;
    const range = (rawMax - rawMin) / yScale;
    return {
      rawMax,
      rawMin,
      center,
      range,
      max: center + range / 2,
      min: center - range / 2,
    };
  }, [candles, yScale]);

  const priceToY = (price: number) =>
    CHART_PADDING +
    (CHART_HEIGHT - CHART_PADDING * 2) * (1 - (price - min) / (max - min));

  const candleWidth = scale + 2;
  const totalChartWidth = candles.length * candleWidth;
  const minTranslateX = Math.min(0, width - totalChartWidth);

  const hoveredIndex = useMemo(() => {
    if (hoverX === null) return null;
    return Math.floor(
      (width - CHART_PADDING - translateX - hoverX) / (candleWidth + 2)
    );
  }, [hoverX, translateX, candleWidth]);

  const hoveredCandle = useMemo(() => {
    if (
      hoveredIndex === null ||
      hoveredIndex < 0 ||
      hoveredIndex >= candles.length
    )
      return null;
    return candles[candles.length - 1 - hoveredIndex];
  }, [hoveredIndex, candles]);

  const typicalPriceData = useMemo(
    () => candles.map(c => (c.high + c.low + c.close) / 3),
    [candles]
  );

  useEffect(() => {
    if (translateX > minTranslateX + 40 && !isLoadingMore) {
      setIsLoadingMore(true);
      const newOffset = offset + 100;

      ReloadCandles(timeframe, data, newOffset).then(newData => {
        if (newData.length > 0) {
          setDataTimeframe(prev => [...newData, ...prev]);
          setOffset(newOffset);
        }
        setIsLoadingMore(false);
      });
    }
  }, [translateX, minTranslateX]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      if (gestureState.numberActiveTouches === 1) {
        setHoverX(gestureState.x0);
        setHoverY(gestureState.y0);
        initialTouch.current = { x: gestureState.x0, y: gestureState.y0 };

        longPressTimeout.current = setTimeout(() => {
          isFrozen.current = true;
          setHoverX(null);
          setHoverY(null);
        }, 300);
      }
    },
    onPanResponderMove: (event, gestureState) => {
      const touches = event.nativeEvent.touches;

      const movedFar =
        Math.abs(gestureState.moveX - initialTouch.current.x) > MOVE_THRESHOLD ||
        Math.abs(gestureState.moveY - initialTouch.current.y) > MOVE_THRESHOLD;

      if (movedFar && longPressTimeout.current) {
        clearTimeout(longPressTimeout.current);
        longPressTimeout.current = null;
      }

      if (touches.length === 1) {
        const touch = touches[0];
        setHoverX(touch.locationX);
        setHoverY(touch.locationY);

        if (!isFrozen.current) {
          setTranslateX(prev => prev + gestureState.dx);
        }
      } else if (touches.length === 2 && !isFrozen.current) {
        const d = distance(touches);
        const dy = Math.abs(touches[0].pageY - touches[1].pageY);
        const dx = Math.abs(touches[0].pageX - touches[1].pageX);

        if (lastPinchDistance !== null) {
          const scaleFactor = d / lastPinchDistance;
          if (dy > dx) {
            setYScale(prev => clamp(prev * scaleFactor, 0.5, 5));
          } else {
            setScale(prev => clamp(prev * scaleFactor, 4, 100));
          }
        }
        setLastPinchDistance(d);
      }
    },
    onPanResponderRelease: () => {
      setHoverX(null);
      setHoverY(null);
      setLastPinchDistance(null);
      if (longPressTimeout.current) {
        clearTimeout(longPressTimeout.current);
        longPressTimeout.current = null;
      }
      isFrozen.current = false;

      // Snap lại khi vượt quá giới hạn
      setTranslateX(prev => {
        if (prev > 40) return MAX_TRANSLATE_X;
        if (prev < minTranslateX - 40) return minTranslateX;
        return prev;
      });
    },
  });

  const clipRect = Skia.XYWHRect(0, 0, width, CHART_HEIGHT);

  useEffect(() => {
    loadCandles(timeframe, data).then(setDataTimeframe);
  }, [timeframe]);

  useEffect(() => {
    onLoadingData(isLoadingMore)
  }, [isLoadingMore])

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>


      {dataTimeframe?.length === 0 ?
        <View style={[styleGeneral.flexCenter, styleGeneral.backgroudTrans]}>
          <ActivityIndicator size="large" color={colors.backgroundHeader} />
          <Text style={{ color: colors.tabIconDefault, marginTop: 10 }}>{t('Đang chờ dữ liệu...')}</Text>
        </View>
        :
        <>
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TimeframeSelector tint={colors.tint} backgroundColor={colors.background} selected={timeframe} onSelect={setTimeframe} />

            <CheckBox
              onPress={() => setShowTypicalLine(prev => !prev)}
              isCheck={showTypicalLine}
            />
          </View>
          <Canvas
            style={{
              width,
              height: CHART_HEIGHT + VOLUME_HEIGHT + TIME_AXIS_HEIGHT,
              backgroundColor: colors.background,
            }}
            {...panResponder.panHandlers}
          >
            <Grid color={colors?.grid} width={width} height={CHART_HEIGHT} verticalLines={8} horizontalLines={8} />

            <DividerLines
              candles={candles}
              width={width}
              height={CHART_HEIGHT}
              scale={scale}
              translateX={translateX}
            />

            <Group clip={clipRect}>
              <CandleChart
                candles={candles}
                width={width}
                height={CHART_HEIGHT}
                scale={scale}
                translateX={translateX}
                max={max}
                min={min}
                hoveredIndex={hoveredIndex}
                isFrozen={isFrozen.current}
              />

              {showTypicalLine && (
                <TypicalPriceLine
                  candles={candles}
                  data={typicalPriceData}
                  width={width}
                  height={CHART_HEIGHT}
                  scale={scale}
                  translateX={translateX}
                  max={max}
                  min={min}
                  color={colors.tint}
                />
              )}

              <VolumeChart
                candles={candles}
                width={width}
                height={VOLUME_HEIGHT - 25}
                chartHeight={CHART_HEIGHT}
                scale={scale}
                translateX={translateX}
                yOffset={CHART_HEIGHT - 48}
              />
            </Group>

            <Axis colorLine={colors.grid} colorText={colors.text} backgroud={colors.background} width={width} height={CHART_HEIGHT} max={max} min={min} scaleY={yScale} />

            <TimeScale
              candles={candles}
              width={width}
              chartHeight={CHART_HEIGHT}
              scale={scale}
              translateX={translateX}
              chartWidth={width}
              colorText={colors.text}
              colorLine={colors.grid}
            />

            {hoverX !== null && hoverY !== null && hoveredCandle && isFrozen.current && (
              <>
                <Group clip={clipRect}>
                  <Crosshair x={hoverX} y={hoverY} width={width} height={CHART_HEIGHT + VOLUME_HEIGHT} />
                </Group>
                <Overlay
                  x={hoverX}
                  y={hoverY}
                  tooltipY={CHART_HEIGHT + VOLUME_HEIGHT - 73}
                  color={colors.tint}
                  candleHover={hoveredCandle}
                  colorText={colors.text}
                />
              </>
            )}

            <Group clip={clipRect}>
              <CurrentPriceLine
                price={candles.at(-1)!.close}
                y={priceToY(candles.at(-1)!.close)}
                color={
                  candles.at(-1)!.close >= candles.at(-1)!.open ? "#02dfc9" : "#ff5b5b"
                }
              />
            </Group>

            {isFrozen.current && (
              <Rect x={0} y={0} width={width} height={CHART_HEIGHT + VOLUME_HEIGHT + 73} color="black" opacity={0.01} />
            )}
          </Canvas>
        </>
      }
    </View>
  );
};

export default MainChart;


const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    height: 46,
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: 20
  },
});