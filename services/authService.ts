import type { Login as LoginType } from "@/@types/Auth";
import { handleAxiosError } from "@/helpers/axiosHelper";
import axiosInstance from "@/lib/axios";
import { showToast } from "@/helpers/toastHelper";

const authenticate = async (data: LoginType) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      ...data,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    throw error;
  }
};

export { authenticate };
