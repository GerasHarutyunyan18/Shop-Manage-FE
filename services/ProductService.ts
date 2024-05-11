import axiosInstance from "./axiosInstance";

export const ProductService = {
    getByMarketId: async (id: number, name?: string) => {
        try {
            const res = await axiosInstance.get(`product/market/${id}?name=${name ?? ''}`);

            return res.data;
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
};
