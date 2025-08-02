import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { ChartIcon, EditPencilIcon, FilterIcon, HistoryIcon, PriceIcon, SettingIcon, TransactionIcon } from '@/assets/icons';
import { StatusBar } from 'expo-status-bar';
import { useAppInfo } from '@/hooks/useAppInfo';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t, colors } = useAppInfo()

  return (
    <>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarActiveTintColor: colors.tabIconSelected,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerTintColor: '#fff', // ✅ Đổi màu chữ header
          headerStyle: {
            backgroundColor: colors.backgroundHeader, // ✅ Đổi màu nền header
            height: 70,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          },
          // headerTransparent: true, // Làm header trong suốt
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('Giá'),
            tabBarIcon: ({ color }) => <PriceIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="chart/index"
          options={{
            title: t('Biểu đồ'),
            tabBarIcon: ({ color }) => <ChartIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="transaction/index"
          options={{
            title: t('Giao dịch'),
            tabBarIcon: ({ color }) => <TransactionIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="history/index"
          options={{
            title: t('Lịch sử'),
            tabBarIcon: ({ color }) => <HistoryIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="setting/index"
          options={{
            title: t('Cài đặt'),
            tabBarIcon: ({ color }) => <SettingIcon color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

