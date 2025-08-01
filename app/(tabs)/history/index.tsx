import { Animated, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';

import { Text, View } from '@/components/Themed';
import CustomTabBar from '@/components/tradingTabs/CustomTabBar';
import { useTheme } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { HistoryIcon } from '@/assets/icons';

const FirstRoute = () => (
    <View style={styles.scene}><Text style={styles.text}>Lệnh có trạng</Text></View>
);
const SecondRoute = () => (
    <View style={styles.scene}><Text style={styles.text}>Các lệnh</Text></View>
);
const ThirdRoute = () => (
    <View style={styles.scene}><Text style={styles.text}>Các giao dịch</Text></View>
);


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
                <CustomTabBar
                    navigationState={{ index, routes }}
                    position={new Animated.Value(index)} // hoặc custom nếu bạn cần animation
                    jumpTo={(key) => {
                        const newIndex = routes.findIndex(r => r.key === key);
                        setIndex(newIndex);
                    }}
                />
            ),
            headerRight: () => (
                <Link href="/modal" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <HistoryIcon
                                color={colors.background}
                                style={{ marginRight: 25, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>
            ),
        });
    }, [navigation, index]);

    return (
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
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: { color: '#000' },
});