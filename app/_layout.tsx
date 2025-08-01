import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';

import { MyDarkTheme, MyLightTheme, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { registerForPushNotificationsAsync } from '@/utils/notifications';

export const unstable_settings = {
  // initialRouteName: '(tabs)',
  initialRouteName: null,
};

const { height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const logoTranslateY = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const splashOpacity = useSharedValue(1);
  const splashTranslateY = useSharedValue(0);
  const splashScale = useSharedValue(1);

  const [fontsLoaded] = useFonts({
    MontserratBold: require('../assets/fonts/DancingScript-Bold.ttf'),
    MontserratRegular: require('../assets/fonts/DancingScript-Regular.ttf'),
    MontserratMedium: require('../assets/fonts/DancingScript-Medium.ttf'),
    MontserratSemiBold: require('../assets/fonts/DancingScript-SemiBold.ttf'),
  });

  useEffect(() => {
    const runAnimation = async () => {
      await new Promise((res) => setTimeout(res, 400)); // nhỏ delay ban đầu

      // 🔊 Âm thanh chào mừng
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/notifications-sound-127856.mp3'),
        { shouldPlay: true }
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });

      // ✨ Animate logo bay lên + text mờ dần vào
      logoTranslateY.value = withTiming(-height * 0.2, {
        duration: 800,
        easing: Easing.out(Easing.exp),
      });

      textOpacity.value = withDelay(
        300,
        withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
      );

      // 💥 Zoom nhẹ khi kết thúc splash
      splashScale.value = withDelay(
        1800,
        withTiming(1.1, { duration: 500, easing: Easing.out(Easing.exp) })
      );

      // 🎯 Biến mất splash
      splashOpacity.value = withDelay(
        2000,
        withTiming(0, { duration: 500 }, async () => {
          runOnJS(setIsReady)(true);
        })
      );

      splashTranslateY.value = withDelay(
        2000,
        withTiming(-30, { duration: 500, easing: Easing.out(Easing.cubic) })
      );

      SplashScreen.hideAsync();
    };

    runAnimation();
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textOpacity.value * -10 }],
  }));

  const splashStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
    transform: [
      { translateY: splashTranslateY.value },
      { scale: splashScale.value },
    ],
  }));

  if (!fontsLoaded || !isReady) {
    return <Animated.View style={[StyleSheet.absoluteFill, splashStyle]}>
      {/* 🌈 Nền Gradient + Blur */}
      <LinearGradient
        colors={['#d81f66ff', '#d81f6690', '#d81f6656']}
        style={StyleSheet.absoluteFill}
      />
      <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />

      <View style={styles.container}>
        {/* <Animated.Image
            source={require('../assets/images/splash.png')}
            style={[styles.logo, logoStyle]}
            resizeMode="contain"
          /> */}
        <Animated.Text style={[styles.text, textStyle]}>
          Stock tracking!
        </Animated.Text>
      </View>
    </Animated.View>
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const setup = async () => {
      await registerForPushNotificationsAsync(); // 👈 Gọi đăng ký push
    };

    setup();

    const sub1 = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const sub2 = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification clicked:', response);
    });

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'light' ? MyDarkTheme : MyLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="login" options={{ headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  text: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    fontWeight: '600',
    color: '#fff',
  },
});
