"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import type { ResetPassword as ResetPasswordType } from "@/@types/Auth";
import { resetPassword as resetPasswordService } from "@/services/authService";
import { showToast } from "@/helpers/toastHelper";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { HttpStatus } from "@/constants/httpStatus";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>();

  const onSubmit = async (data: ResetPasswordType) => {
    data.email = email || "";
    setLoading(true);
    try {
      const response = await resetPasswordService({
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      if (response && response.status == HttpStatus.OK) {
        showToast("Đặt lại mật khẩu thành công", "success");
        router.push("/dang-nhap");
      } else {
        showToast(response.error, "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 flex items-center justify-center">
      <Card className="rounded-md max-w-[600px] w-full shadow-none">
        <CardContent>
          <div className="flex border-b">
            <div className="w-full text-center py-4 font-semibold text-xl text-gray-900 border-b-2 border-red-500">
              Đặt lại mật khẩu
            </div>
          </div>

          <form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="rounded-2xl h-12 w-full pl-10 shadow-none"
                placeholder="Mật khẩu"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
              />
              <LockIcon
                className="absolute top-4 left-3 text-gray-400"
                size={20}
              />

              {showPassword ? (
                <EyeIcon
                  className="absolute top-4 right-3 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOffIcon
                  className="absolute top-4 right-3 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="relative">
              <Input
                type={showPasswordConfirmation ? "text" : "password"}
                className="rounded-2xl h-12 w-full pl-10 shadow-none"
                placeholder="Nhập lại mật khẩu"
                {...register("password_confirmation", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
              />
              <LockIcon
                className="absolute top-4 left-3 text-gray-400"
                size={20}
              />

              {showPasswordConfirmation ? (
                <EyeIcon
                  className="absolute top-4 right-3 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                />
              ) : (
                <EyeOffIcon
                  className="absolute top-4 right-3 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={() => setShowPasswordConfirmation(!showPassword)}
                />
              )}
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="text-md cursor-pointer rounded-2xl h-12 w-full shadow-none bg-[#d61117] text-white hover:bg-[#d61117] focus:bg-[#d61117] focus:ring-2 focus:ring-[#d61117] focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" size={20} />
              ) : (
                <span>Đặt lại mật khẩu</span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/dang-nhap"
              className="text-md text-blue-500 hover:text-blue-700 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>

          <div className="mt-10 text-center text-sm">
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{" "}
            <span className="text-blue-500">điều khoản sử dụng</span> cũng như{" "}
            <span className="text-blue-500">chính sách bảo mật</span> của chúng
            tôi
          </div>

          <div className="mt-2 text-center text-sm">
            Bản quyền © 2015 - 2025 Phongtro123.com
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
