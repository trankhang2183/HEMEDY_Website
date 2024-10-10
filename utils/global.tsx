import { ReactNode } from "react";
import { AiFillSchedule } from "react-icons/ai";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { GrDocumentConfig } from "react-icons/gr";
import { PiSirenThin } from "react-icons/pi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdOutlineRequestPage } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

import { ROLE_ADMIN } from "./constants";

export interface SliderMenuItem {
  key: string;
  icon: ReactNode;
  label: string;
}

export const sliderMenu = [
  {
    key: "dashboard",
    icon: <TbLayoutDashboard />,
    label: "Thống kê",
  },
  {
    key: "account",
    icon: <BiSolidUserAccount />,
    label: "Tài khoản",
  },
  {
    key: "emergency",
    icon: <PiSirenThin />,
    label: "Khẩn cấp",
  },
  {
    key: "transaction",
    icon: <GrTransaction />,
    label: "Giao dịch",
  },
  {
    key: "request",
    icon: <MdOutlineRequestPage />,
    label: "Quản lý yêu cầu",
  },
  {
    key: "support",
    icon: <MdOutlineSupportAgent />,
    label: "Hỗ trợ vấn đề",
  },

  {
    key: "configuration",
    icon: <GrDocumentConfig />,
    label: "Cấu hình",
  },
] as SliderMenuItem[];
