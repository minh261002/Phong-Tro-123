import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản mới",
};

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RegisterLayout;
