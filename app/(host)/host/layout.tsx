import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host",
  description: "Host Page",
};

const HomeHostLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};

export default HomeHostLayout;
