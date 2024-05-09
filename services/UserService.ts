import axiosInstance from "./axiosInstance";

export const UserService = {
    getByMarketId: async (id: string) => {
        try {
            const res = await axiosInstance.get(`user/market/${id}`);

            return res.data;
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
};
