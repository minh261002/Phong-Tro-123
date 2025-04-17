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

const Header = () => {
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
                  <UserCircleIcon className="text-gray-400" size={18} />
                  Tài khoản
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className=" rounded-full cursor-pointer"
              variant={"destructive"}
            >
              <PencilIcon className="text-white" size={18} />
              Đăng tin
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
