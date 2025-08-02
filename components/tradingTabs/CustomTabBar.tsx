import { useAppInfo } from '@/hooks/useAppInfo';
import { BlurView } from 'expo-blur';
import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    LayoutChangeEvent,
    StyleSheet,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

interface Props {
    navigationState: any;
    position: any;
    jumpTo: (key: string) => void;
}

export default function CustomTabBar({ navigationState, jumpTo }: Props) {
    const { t, colors } = useAppInfo()
    const [layouts, setLayouts] = useState<{ x: number; width: number }[]>([]);
    const indicatorX = useSharedValue(0);
    const indicatorW = useSharedValue(0);

    useEffect(() => {
        if (layouts.length === navigationState.routes.length) {
            const index = navigationState.index;
            const layout = layouts[index];
            indicatorX.value = withTiming(layout.x, { duration: 200 });
            indicatorW.value = withTiming(layout.width, { duration: 200 });
        }
    }, [navigationState.index, layouts]);

    const onTabLayout = (e: LayoutChangeEvent, index: number) => {
        const { x, width } = e.nativeEvent.layout;
        setLayouts(prev => {
            const next = [...prev];
            next[index] = { x, width };
            return next;
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: indicatorX.value }],
        width: indicatorW.value,
    }));

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                <BlurView intensity={10} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: 6 }]} />
                {layouts.length === navigationState.routes.length && (
                    <Animated.View style={[styles.indicator, animatedStyle, { backgroundColor: colors.backgroundSetting }]} />
                )}

                {navigationState.routes.map((route: any, index: number) => {
                    const focused = navigationState.index === index;

                    return (
                        <React.Fragment key={route.key}>
                            <TouchableOpacity
                                onPress={() => jumpTo(route.key)}
                                onLayout={(e) => onTabLayout(e, index)}
                                activeOpacity={0.7}
                                style={styles.tab}
                            >
                                <Text style={[styles.text, { opacity: focused ? 1 : 0.8, fontWeight: '500' }]}>
                                    {t(route.title)}
                                </Text>
                            </TouchableOpacity>
                            {/* Vạch dọc phân cách (trừ tab cuối) */}
                            {index < navigationState.routes.length - 1 && (
                                <View style={styles.separator} />
                            )}
                        </React.Fragment>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        position: 'relative',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 6,
        overflow: "hidden"
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#00000063',
        borderRadius: 6,
        zIndex: -1,
    },
    tab: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    text: {
        color: '#fff',
        fontSize: 12,
    },
    separator: {
        width: 1,
        height: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // hoặc '#333', tùy nền
        alignSelf: 'center',
        marginVertical: 8,
        zIndex: 100
    },
});
