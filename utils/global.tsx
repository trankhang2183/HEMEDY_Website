import { ReactNode } from "react";
import { AiFillSchedule, AiOutlineDashboard } from "react-icons/ai";
import { BiSolidUserAccount } from "react-icons/bi";
import {
  MdOutlinePersonPin,
  MdOutlineSupportAgent,
  MdOutlineVideoCameraFront,
} from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { GrDocumentConfig } from "react-icons/gr";
import { PiSirenThin } from "react-icons/pi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdOutlineRequestPage } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

import { ROLE_ADMIN, ROLE_DOCTOR } from "./constants";
import {
  IoCalendarOutline,
  IoCartOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";

export interface SliderMenuItem {
  key: string;
  icon: ReactNode;
  label: string;
  roles: string[];
}

export const sliderMenu = [
  {
    key: "/admin/dashboard",
    icon: <AiOutlineDashboard />,
    label: "Dashboard",
    roles: [ROLE_ADMIN],
  },
  {
    key: "/admin/order",
    icon: <IoCartOutline />,
    label: "Đơn hàng",
    roles: [ROLE_ADMIN],
  },
  {
    key: "/admin/user",
    icon: <IoPersonCircleOutline />,
    label: "Người dùng",
    roles: [ROLE_ADMIN],
  },
  {
    key: "/admin/content",
    icon: <LuFileEdit />,
    label: "Nội dung",
    roles: [ROLE_ADMIN],
  },
  {
    key: "/admin/professional",
    icon: <FaUserDoctor />,
    label: "Chuyên gia",
    roles: [ROLE_ADMIN],
  },
  {
    key: "/doctor/calendar",
    icon: <IoCalendarOutline />,
    label: "Quản lý lịch hẹn",
    roles: [ROLE_DOCTOR],
  },
  {
    key: "/doctor/patient",
    icon: <MdOutlinePersonPin />,
    label: "Quản lý bệnh nhân",
    roles: [ROLE_DOCTOR],
  },
  {
    key: "/doctor/call",
    icon: <MdOutlineVideoCameraFront />,
    label: "Cuộc gọi Video",
    roles: [ROLE_DOCTOR],
  },
  {
    key: "/doctor/setting",
    icon: <IoSettingsOutline />,
    label: "Cài đặt",
    roles: [ROLE_DOCTOR],
  },
] as SliderMenuItem[];
