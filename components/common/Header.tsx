"use client";
import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FilterIcon,
  FolderIcon,
  HeartIcon,
  MapPinIcon,
  PencilIcon,
  UserCircleIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";
import { showToast } from "@/helpers/toastHelper";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const handleLogout = () => {
    showToast("Đăng xuất thành công", "success");
    logout();
  };

  return (
    <div className="w-full bg-white">
      <div className="border-b border-gray-100">
        <div className="max-w-[1280px] mx-5 md:mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={280} height={280} />
            </Link>
            <div className="relative w-1/2">
              <Input
                className="rounded-full h-10 w-full pl-10 shadow-none"
                placeholder="Tìm kiếm theo khu vực"
              />
              <MapPinIcon
                className="absolute top-3 left-3 text-gray-400"
                size={18}
              />
            </div>

            <div className="relative">
              <Button
                className="rounded-full h-10 pl-10 cursor-pointer shadow-none"
                variant={"outline"}
              >
                Bộ lọc
              </Button>
              <FilterIcon
                className="absolute top-3 left-3 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <Button
              className=" rounded-full border-none shadow-none cursor-pointer"
              variant={"outline"}
            >
              <HeartIcon className="text-gray-400" size={18} />
              Tin đã lưu
            </Button>
            <Button
              className=" rounded-full border-none shadow-none cursor-pointer"
              variant={"outline"}
            >
              <FolderIcon className="text-gray-400" size={18} />
              Quản lý
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className=" rounded-full border-none shadow-none cursor-pointer"
                  variant={"outline"}
                >
                  {isAuthenticated && user ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={user.image || " /placeholder.png"}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-gray-800">{user.name}</span>
                        <span className="text-gray-400 text-xs`">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="text-gray-800" size={18} />
                      <span className="text-gray-800">Tài khoản</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              {isAuthenticated && user ? (
                <DropdownMenuContent>
                  <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/dang-nhap">Đăng nhập</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dang-ky">Đăng ký</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>

            <Button
              className=" rounded-full cursor-pointer"
              variant={"destructive"}
            >
              <Link href="/host" className="flex items-center gap-2">
                <PencilIcon className="text-white" size={18} />
                Đăng tin
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
