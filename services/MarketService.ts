import axiosInstance from "./axiosInstance";

export const MarketService = {
    getUserMarkets: async (userToken: string) => {
        try {
            const res = await axiosInstance.get(`market/user/${userToken}`);

            return res.data;
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
    getById: async (id: number) => {
        try {
            const res = await axiosInstance.get(`market/${id}`);

            return res.data;
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
};
