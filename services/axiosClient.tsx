import axios from 'axios';
import { AsyncStorageRead } from '@/utils/general';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = AsyncStorageRead('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
