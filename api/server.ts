import axiosClient from "@/services/axiosClient"

export const serverSymbolApi = async () => {
    const data = await axiosClient.get('/accmt5')
    return data.data.data
}