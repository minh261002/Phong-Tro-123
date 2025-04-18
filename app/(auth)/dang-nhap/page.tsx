"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
} from "lucide-react";
import type { Login as LoginType } from "@/@types/Auth";
import { authenticate } from "@/services/authService";
import useAuthStore from "@/store/authStore";
import { HttpStatus } from "@/constants/httpStatus";
import { showToast } from "@/helpers/toastHelper";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit = async (data: LoginType) => {
    setLoading(true);
    try {
      const response = await authenticate(data);
      if (response && response.status == HttpStatus.OK) {
        const loginData = {
          access_token: response.access_token,
          token_type: response.token_type,
          user: response.user,
        };
        login(loginData);
        router.push("/");

        showToast("Xin chào, " + response.user.name, "success");
      } else if (response && response.status == HttpStatus.UNAUTHORIZED) {
        showToast(response.error, "error");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 flex items-center justify-center">
      <Card className="rounded-md max-w-[600px] w-full shadow-none">
        <CardContent>
          <div className="flex border-b">
            <Link
              href="/dang-nhap"
              className="w-1/2 text-center py-4 font-semibold text-xl text-gray-900 border-b-2 border-red-500"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="w-1/2 text-center py-4 font-semibold text-xl text-gray-500 border-b border-gray-200"
            >
              Tạo tài khoản mới
            </Link>
          </div>

          <form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <Input
                className="rounded-2xl h-12 w-full pl-10 shadow-none"
                placeholder="Email"
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              <MailIcon
                className="absolute top-4 left-3 text-gray-400"
                size={20}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

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

            <Button
              type="submit"
              className="text-md cursor-pointer rounded-2xl h-12 w-full shadow-none bg-red-600 text-white hover:bg-red-700 "
              disabled={loading}
            >
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" size={20} />
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/quen-mat-khau"
              className="text-md text-blue-500 hover:text-blue-700 hover:underline"
            >
              Quên mật khẩu?
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

export default LoginPage;
