import { create } from "zustand";

interface ToastStore {
  message: string;
  type?: "success" | "error";
  setMessage: (message: string) => void;
  setType: (type: "success" | "error") => void;
  clearToast: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  message: "",
  type: "success",
  setMessage: (message) => set({ message }),
  setType: (type) => set({ type }),
  clearToast: () => set({ message: "", type: "success" }), // Reset message và type
}));

export default useToastStore;
