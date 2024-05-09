import { SignInData, SignUpData } from "@/constants/interfaces";
import axiosInstance from "./axiosInstance";

export const AuthService = {
  signUp: async (data: SignUpData) => {
    try {
      const res = await axiosInstance.post("auth/signup", data);

      return res.data;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
  signIn: async (data: SignInData) => {
    try {
      const res = await axiosInstance.post("auth/signin", data);

      return res.data;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
  authToken: async (token: string) => {
    try {
      const res = await axiosInstance.get(`auth/token/${token}`);

      return res.data;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
