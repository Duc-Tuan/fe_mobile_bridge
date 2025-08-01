import axios from 'axios';
import { API_URL } from '@env';
import { AsyncStorageRead } from '@/utils/general';

const axiosClient = axios.create({
    baseURL: API_URL,
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
