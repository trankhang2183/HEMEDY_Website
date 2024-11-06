"use client";

import { ReactNode } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlinePersonPin, MdOutlineVideoCameraFront } from "react-icons/md";


import { ROLE_ADMIN, ROLE_DOCTOR } from "./constants";
import {
  IoCalendarOutline,
  IoCartOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { toast } from "react-toastify";

import customer from "@services/customer";
import { useSession } from "next-auth/react";

export interface SliderMenuItem {
  key: string;
  icon: ReactNode;
  label: string;
  roles: string[];
}

export const sliderMenu = [
  {
    key: "admin/dashboard",
    icon: <AiOutlineDashboard />,
    label: "Dashboard",
    roles: [ROLE_ADMIN],
  },
  {
    key: "admin/order",
    icon: <IoCartOutline />,
    label: "Đơn hàng",
    roles: [ROLE_ADMIN],
  },
  {
    key: "admin/user",
    icon: <IoPersonCircleOutline />,
    label: "Người dùng",
    roles: [ROLE_ADMIN],
  },
  {
    key: "admin/professional",
    icon: <FaUserDoctor />,
    label: "Chuyên gia",
    roles: [ROLE_ADMIN],
  },
  {
    key: "admin/content",
    icon: <LuFileEdit />,
    label: "Nội dung",
    roles: [ROLE_ADMIN],
  },
  {
    key: "doctor/calendar",
    icon: <IoCalendarOutline />,
    label: "Quản lý lịch hẹn",
    roles: [ROLE_DOCTOR],
  },
  {
    key: "doctor/patient",
    icon: <MdOutlinePersonPin />,
    label: "Quản lý bệnh nhân",
    roles: [ROLE_DOCTOR],
  },
  {
    key: "doctor/call",
    icon: <MdOutlineVideoCameraFront />,
    label: "Cuộc gọi Video",
    roles: [ROLE_DOCTOR],
  },
  {
    key: "doctor/setting",
    icon: <IoSettingsOutline />,
    label: "Cài đặt",
    roles: [ROLE_DOCTOR],
  },
] as SliderMenuItem[];

export const handleActionNotSupport = () => {
  toast.warning("Tính năng chưa hỗ trợ");
};

export const toastError = (error: any) => {
  const messages = error?.response?.data?.message;

  if (Array.isArray(messages)) {
    const combinedMessage = messages.join("\n");
    toast.error(combinedMessage);
  } else {
    toast.error(messages || error.message || "An error occurred");
  }
};

export const checkTheMoneyInWallet = async (
  money: number,
  token: any
): Promise<boolean> => {
  const userProfile = await customer.getCustomerProfile(
    token?.user.access_token!,
    token?.user.email!
  );

  if (money > userProfile?.account_balance) {
    toast.error(
      "Số tiền trong ví không đủ để thực hiện thanh toán. Vui lòng nạp thêm hoặc chọn phương thức khác!",
      {
        autoClose: 5000,
      }
    );
    return false;
  } else {
    return true;
  }
};

export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

