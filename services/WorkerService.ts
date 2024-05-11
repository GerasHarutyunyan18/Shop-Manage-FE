import { CreateUserPayload } from "@/constants/interfaces";
import axiosInstance from "./axiosInstance";

export const WorkerService = {
    getByMarketId: async (id: string) => {
        try {
            const res = await axiosInstance.get(`user/market/${id}`);

            return res.data;
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
    createUser: async (data: CreateUserPayload, token: string, marketId: number) => {
        try {
            const res = await axiosInstance.post("user/create", { ...data, creatorToken: token, marketId });

            return res.data
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
    deleteUser: async (token: string, id: number) => {
        try {
            const res = await axiosInstance.delete("user/delete", { data: { ownerToken: token, id } });

            return res.data
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    },
};
