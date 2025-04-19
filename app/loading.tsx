import { Loader2Icon } from "lucide-react";
import React from "react";

const RootLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2Icon className="animate-spin text-orange-500" size={40} />
    </div>
  );
};

export default RootLoading;
