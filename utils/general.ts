import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// Lưu
export const AsyncStorageSave = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

// Đọc
export const AsyncStorageRead = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        const data = JSON.parse(value);
        return data;
    }
}

// Xóa
export const AsyncStorageDelete = async (key: string) => {
    await AsyncStorage.removeItem(key);
}

export const checkToken = async (): Promise<boolean> => {
    const data = await AsyncStorageRead('token')
    return !!data;
}

export async function generateUUID() {
    const randomBytes = await Crypto.getRandomBytesAsync(16);

    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // version 4
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // variant 10

    const hex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');

    return (
        hex.substring(0, 8) + '-' +
        hex.substring(8, 12) + '-' +
        hex.substring(12, 16) + '-' +
        hex.substring(16, 20) + '-' +
        hex.substring(20)
    );
}