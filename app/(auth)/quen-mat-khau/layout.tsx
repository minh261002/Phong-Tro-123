import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Quên mật khẩu",
};

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ForgotPasswordLayout;
