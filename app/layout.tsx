"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import useToastStore from "@/store/toastStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { showToast } from "@/helpers/toastHelper";
import ReactQueryProvider from "@/providers/Provider";
import useAuthStore from "@/store/authStore";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { message, type, clearToast } = useToastStore();
  const { logout, isAuthenticated, accessToken } = useAuthStore();

  useEffect(() => {
    if (message && type) {
      showToast(message, type);
      clearToast();
    }
  }, [message, type, clearToast]);

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
