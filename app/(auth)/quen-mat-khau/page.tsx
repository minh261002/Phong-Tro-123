"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ForgotPassword as ForgotPasswordType } from "@/@types/Auth";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import {
  forgotPassword as forgotPasswordService,
  verifyOtp as verifyOtpService,
} from "@/services/authService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { showToast } from "@/helpers/toastHelper";

const ForgotPasswordPage = () => {
  const { isAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [isSendSuccess, setIsSendSuccess] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpLoading, setOtpLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>();

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: ForgotPasswordType) => {
    setLoading(true);
    try {
      const repsonse = await forgotPasswordService(data);
      if (repsonse && repsonse.status == 200) {
        setIsSendSuccess(true);
        showToast("Đã gửi mã xác thực đến email của bạn", "success");
        setOpen(true);
        setEmail(data.email);
      } else {
        setIsSendSuccess(false);
        showToast(repsonse.error, "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp_code: string, email: string) => {
    setOtpLoading(true);
    try {
      const response = await verifyOtpService({ email, otp_code });
      if (response && response.status == 200) {
        showToast("Xác thực thành công", "success");
        router.push("/thay-doi-mat-khau?email=" + email);
      } else {
        showToast(response.error, "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length == 6) {
      handleVerifyOtp(value, email);
    }
  };

  return (
    <div className="w-full mt-10 flex items-center justify-center">
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (value === false) return;
          setOpen(value);
        }}
      >
        <DialogContent className="w-full sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center mb-4">
              Nhập mã otp của bạn
            </DialogTitle>
            {otpLoading ? (
              <div className="flex items-center justify-center">
                <Loader2Icon className="animate-spin mr-2" size={20} />
                <span>Đang xác thực...</span>
              </div>
            ) : (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                className="flex items-center justify-center gap-2"
                value={otp}
                onChange={handleOtpChange}
              >
                <InputOTPGroup className="flex gap-2 w-full justify-center">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-14 h-14 border border-gray-300 rounded-md text-center text-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Card className="rounded-md max-w-[600px] w-full shadow-none">
        <CardContent>
          <div className="flex border-b">
            <div className="w-full text-center py-4 font-semibold text-xl text-gray-900 border-b-2 border-red-500">
              Quên mật khẩu
            </div>
          </div>
          {isSendSuccess ? (
            <>Đã gửi</>
          ) : (
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

              <Button
                type="submit"
                className="text-md cursor-pointer rounded-2xl h-12 w-full shadow-none bg-red-600 text-white hover:bg-red-700 "
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon className="animate-spin mr-2" size={20} />
                ) : (
                  "Gửi yêu cầu"
                )}
              </Button>
            </form>
          )}

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

export default ForgotPasswordPage;
