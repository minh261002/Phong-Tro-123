import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản của bạn",
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
