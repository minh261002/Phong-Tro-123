import Header from "@/components/common/Header";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-sceen">
      <div>
        <Header />
      </div>

      <div className="w-full h-full bg-[#fef5ed]">{children}</div>
    </div>
  );
};

export default SiteLayout;
