import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thay đổi mật khẩu",
  description: "Thay đổi mật khẩu",
};

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ResetPasswordLayout;
