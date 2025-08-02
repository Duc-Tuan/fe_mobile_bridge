import axiosClient from "@/services/axiosClient";
import { AsyncStorageDelete } from "@/utils/general";

export const loginApi = (username: string, password: string, deviceId: string) => axiosClient.post('/login', { username, password, deviceId })

export const getMeApi = () => {
    const data = axiosClient.get('/me')
    data.then().catch(() => AsyncStorageDelete('token'))
    return data
}
