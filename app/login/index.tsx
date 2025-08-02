// app/login.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Pressable, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from '@/assets/icons';
import { AsyncStorageRead, AsyncStorageSave, generateUUID } from '@/utils/general';
import HeaderWithAnimation from '../(pages)/header/headerWithAnimation';
import { useAppInfo } from '@/hooks/useAppInfo';
import { styleGeneral } from '@/constants/StyleGeneral';
import { Keyboard } from 'react-native';
import ButtonCustom from '@/components/buttonCustom';
import { FloatingInput } from './FloatingInput';
import { FloatingInputPass } from './FloatingInputPass';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getMe, login } from '@/redux/auth/authSlice';

export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } }: any = useForm();
    const { t, colors, loadingLogin } = useAppInfo()
    const navigation = useNavigation();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Đăng nhập',
            headerStyle: {
                backgroundColor: '#d81f66ff',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitle: () => (
                <HeaderWithAnimation color='#d81f66ff'>
                    <View style={[styleGeneral.flexCenter, { paddingRight: 36 }]}>
                        <Text style={{ color: "white", fontWeight: '600', fontSize: 18 }}>{t("Đăng nhập")}</Text>
                    </View>
                </HeaderWithAnimation>),
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon color="#fff" width={30} height={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onSubmit = async (data: any) => {
        try {
            let deviceId = await AsyncStorageRead("device_id");
            if (!deviceId) {
                deviceId = await generateUUID(); // fallback nếu cần
            }
            await dispatch(login({ username: data.username, password: data.password, deviceId })).unwrap();
            dispatch(getMe());
            return router.back();
        } catch (e: any) {
            console.log(e);
        } finally {
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#d81f66ff', '#d81f6690', '#d81f6656']}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.inputContainer}>
                    <View>
                        <FloatingInput
                            control={control}
                            name="username"
                            label={t("Tên đăng nhập")}
                            rules={{ required: t("Vui lòng nhập tên đăng nhập") }}
                            colors={colors.tint}
                        />
                        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
                    </View>

                    <View>
                        <FloatingInputPass
                            control={control}
                            name="password"
                            label={t("Mật khẩu")}
                            rules={{ required: t('Vui lòng nhập mật khẩu') }}
                            colors={colors.tint}
                        />
                        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                    </View>
                </View>

                <ButtonCustom title={t('Đăng nhập')} onPress={handleSubmit(onSubmit)} isLoading={loadingLogin} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 70,
        gap: 20
    },
    inputContainer: {
        justifyContent: 'center',
        gap: 20
    },
    error: {
        color: 'red',
    },
});
