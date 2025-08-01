import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Direction = 'up' | 'down';

export function useAnimatedHeaderStyle(duration = 500, direction: Direction = 'down') {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(direction === 'down' ? -20 : 20);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    useFocusEffect(
        useCallback(() => {
            // Reset giá trị và animate lại mỗi khi trang được focus
            opacity.value = 0;
            translateY.value = direction === 'down' ? -20 : 20;

            opacity.value = withTiming(1, { duration });
            translateY.value = withTiming(0, { duration });

            return () => {
                // Clean-up nếu cần
            };
        }, [])
    );

    return { animatedStyle, opacity, translateY };
}
