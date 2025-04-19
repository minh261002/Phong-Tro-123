import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phongtro123.com - Nền tảng cho thuê nhà trọ hàng đầu Việt Nam",
  description: "Phongtro123.com - Nền tảng cho thuê nhà trọ hàng đầu Việt Nam",
};

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default HomePageLayout;
