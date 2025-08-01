import { Animated, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';

import { Text, View } from '@/components/Themed';
import CustomTabBar from '@/components/tradingTabs/CustomTabBar';
import { useTheme } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { ArrangeSquareIcon, HistoryIcon } from '@/assets/icons';
import HeaderWithAnimation from '../../(pages)/header/headerWithAnimation';
import BodyWithAnimation from '@/app/(pages)/main';

const FirstRoute = () => {
    const { colors } = useTheme();
    return <View style={styles.scene}><Text style={{ color: colors.text }}>Lệnh có trạng</Text></View>
};

const SecondRoute = () => {
    const { colors } = useTheme();
    return <View style={styles.scene}><Text style={{ color: colors.text }}>Các lệnh</Text></View>
};

const ThirdRoute = () => {
    const { colors } = useTheme();
    return <View style={styles.scene}><Text style={{ color: colors.text }}>Các giao dịch</Text></View>
};


export default function HistoryScreen() {
    const { colors } = useTheme();
    const colorScheme = useColorScheme();

    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Lệnh có trạng' },
        { key: 'second', title: 'Các lệnh' },
        { key: 'third', title: 'Các giao dịch' },
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <HeaderWithAnimation>
                    {/* Icon trái */}
                    <Pressable>
                        {({ pressed }) => (
                            <ArrangeSquareIcon
                                color="white"
                                style={{ opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>

                    {/* Tabs */}
                    <View style={{ flex: 1, marginHorizontal: 8, backgroundColor: "transparent" }}>
                        <CustomTabBar
                            navigationState={{ index, routes }}
                            position={new Animated.Value(index)}
                            jumpTo={(key) => {
                                const newIndex = routes.findIndex((r: any) => r.key === key);
                                setIndex(newIndex);
                            }}
                        />
                    </View>

                    {/* Icon phải */}
                    <Pressable>
                        {({ pressed }) => (
                            <HistoryIcon
                                color="white"
                                style={{ opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </HeaderWithAnimation>
            ),
        });
    }, [navigation, index]);

    return (
        <BodyWithAnimation>
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                })}
                swipeEnabled={false}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={() => null} // ❌ Ẩn tabBar gốc
            />
        </BodyWithAnimation>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: { color: '#000' },
});