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

export function applyOpacityToColor(color: string, opacity: number): string {
    // Nếu là màu hex dạng #RRGGBB
    if (color.startsWith('#')) {
        const hex = color.replace('#', '');

        // Chuyển từ hex sang R G B
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // Nếu là màu rgb(x, y, z)
    if (color.startsWith('rgb(')) {
        const values = color
            .replace(/[^\d,]/g, '')
            .split(',')
            .map((v) => parseInt(v.trim()));

        if (values.length === 3) {
            const [r, g, b] = values;
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
    }

    // Nếu không đúng định dạng, trả về nguyên bản
    return color;
}