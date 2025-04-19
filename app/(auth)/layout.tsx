import Header from "@/components/common/Header";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full bg-[#fef5ed]">
      <Header />

      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
