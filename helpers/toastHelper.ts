import { toast } from "react-hot-toast";

export type ToastType = "success" | "error" | undefined;

export const showToast = (message: string, type: ToastType) => {
  if (message) {
    toast.dismiss(); // Dismiss mọi toast hiện tại

    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
  }
};
