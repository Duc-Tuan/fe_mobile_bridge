import axios from 'axios';
import { AsyncStorageRead } from '@/utils/general';

const axiosClient = axios.create({
    baseURL: 'http://192.168.28.6:8000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorageRead('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
