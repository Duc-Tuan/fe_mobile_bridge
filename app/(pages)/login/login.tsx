// app/login.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from '@/assets/icons';
import { AsyncStorageSave } from '@/utils/general';

export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } }: any = useForm();
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Đăng nhập',
            headerStyle: {
                backgroundColor: '#d81f66ff',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ paddingHorizontal: 16 }}
                >
                    <ChevronLeftIcon color="#fff" style={{ marginLeft: -10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onSubmit = (data: any) => {
        if (data.username === 'admin' && data.password === '123456') {
            AsyncStorageSave('token', 'your_token_value');
            router.replace('/(tabs)'); // chuyển sang trang chính
        } else {
            Alert.alert('Sai tài khoản hoặc mật khẩu');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#d81f66ff', '#d81f6690', '#d81f6656']}
                style={StyleSheet.absoluteFill}
            />
            <Controller
                control={control}
                name="username"
                rules={{ required: 'Vui lòng nhập tên đăng nhập' }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Tên đăng nhập"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            <Controller
                control={control}
                name="password"
                rules={{ required: 'Vui lòng nhập mật khẩu' }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Button title="Đăng nhập" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});
