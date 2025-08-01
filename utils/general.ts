import AsyncStorage from '@react-native-async-storage/async-storage';

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
