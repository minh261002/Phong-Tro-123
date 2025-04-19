import type {
  ForgotPassword as ForgotPasswordType,
  Login as LoginType,
  Register as RegisterType,
} from "@/@types/Auth";
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

const register = async (data: RegisterType) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      ...data,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    throw error;
  }
};

const forgotPassword = async (data: ForgotPasswordType) => {
  try {
    const response = await axiosInstance.post("/auth/password/forgot", {
      ...data,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    throw error;
  }
};

const verifyOtp = async (data: { email: string; otp_code: string }) => {
  try {
    const response = await axiosInstance.post("/auth/password/verify-otp", {
      ...data,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    throw error;
  }
};

export { authenticate, register, forgotPassword, verifyOtp };
