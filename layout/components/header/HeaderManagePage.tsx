import { ROLE_ADMIN } from "@utils/constants";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";

// const callback_url = "http://localhost:3000/manage";
const callback_url = "http://hemedy.onrender.com/manage";

const HeaderManagePage = () => {
  const route = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    document.title = `Hemedy | ${session?.user.roles ?? ""}`;
  }, [session?.user.roles]);

  return (
    <div
      className="header-manage-page"
      style={{ borderBottom: "1px solid black" }}
    >
      <div className="flex justify-between flex-row mx-5 my-3">
        <div className="left flex justify-between flex-row items-center gap-4">
          <Image
            src="/images/logo-with-green-text.png"
            width={40}
            height={50}
            alt="logo"
            loading="lazy"
            onClick={() => {
              route.push("/admin/dashboard");
            }}
            className="cursor-pointer"
          />
          <div className="break-line"></div>
          <p className="role-name font-bold text-lg">
            {session?.user.roles === ROLE_ADMIN ? "My admin" : "My doctor"}
          </p>
        </div>

        <div className="right flex justify-between flex-row items-center gap-2">
          <div className="notification flex justify-center items-center">
            <IoIosNotificationsOutline className="icon w-5 h-5" />
          </div>

          <div
            className="btn-logout font-semibold flex justify-between flex-row items-center gap-2"
            onClick={() => {
              signOut({ callbackUrl: `${callback_url}` });
            }}
          >
            <IoIosLogOut className="icon font-semibold" />
            Đăng xuất
          </div>

          <div className="profile flex justify-between flex-row items-center">
            <div className="name text-center font-semibold text-base">
              {session?.user.name || session?.user.fullname}
            </div>
            <div className="icon-person flex justify-center items-center">
              <IoPersonCircleOutline className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderManagePage;
