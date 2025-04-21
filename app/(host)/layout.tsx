"use client";

import useAuthStore from "@/store/authStore";
import WelcomePage from "@/components/common/WelcomePage";

const HostLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated && user?.role == "host" ? (
    <>{children}</>
  ) : (
    <WelcomePage />
  );
};

export default HostLayout;
