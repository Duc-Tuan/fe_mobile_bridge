import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { ChartIcon, EditPencilIcon, FilterIcon, HistoryIcon, PriceIcon, SettingIcon, TransactionIcon } from '@/assets/icons';
import { StatusBar } from 'expo-status-bar';
import { View } from '@/components/Themed';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarActiveTintColor: Colors['light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerTintColor: '#fff', // ✅ Đổi màu chữ header
          headerStyle: {
            backgroundColor: '#d81f66ff', // ✅ Đổi màu nền header
            height: 70,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          },
          // headerTransparent: true, // Làm header trong suốt
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Giá',
            tabBarIcon: ({ color }) => <PriceIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="chart/index"
          options={{
            title: 'Biểu đồ',
            tabBarIcon: ({ color }) => <ChartIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="transaction/index"
          options={{
            title: 'Giao dịch',
            tabBarIcon: ({ color }) => <TransactionIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="history/index"
          options={{
            title: 'Lịch sử',
            tabBarIcon: ({ color }) => <HistoryIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="setting/index"
          options={{
            title: 'Cài đặt',
            tabBarIcon: ({ color }) => <SettingIcon color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

