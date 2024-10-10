"use client";
import React, { useEffect } from "react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS_GENERAL } from "@utils/constants";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import {
  generateFallbackAvatar,
  isExpiredTimeToken,
  isExpiredTimeTokenSecondHandle,
} from "@utils/helpers";

const HeaderHomePage = () => {
  const router = useRouter();
  const [userData, setUserData] = React.useState<any | null>(null);
  const pathName = usePathname();

  const { data: session } = useSession();
  const { data: token } = useSession();

  const isTokenExpired = (token) => {
    return (
      !token.user.access_token ||
      isExpiredTimeToken(token.loginDate, token.expiresIn) ||
      isExpiredTimeTokenSecondHandle(token.iat, token.exp)
    );
  };

// console.log("token", token)
// console.log("session", session)

  const getNavItems = () => {
    if (userData && userData.role_name) {
      switch (userData.role_name) {
        default:
          return NAV_ITEMS_GENERAL;
      }
    } else {
      return NAV_ITEMS_GENERAL;
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {getNavItems().map((item, index) => (
        <p className="p-1 nav-items items-center font-bold" key={index}>
          <Link
            href={item?.path}
            className={`flex items-center text-center ${
              pathName === item?.path ? "active" : ""
            }`}
          >
            {item?.nameItem}
          </Link>
        </p>
      ))}
    </ul>
  );

  return (
    <div className="top-0 z-10 h-max max-w-full border-0 rounded-none px-4 py-2 lg:px-8 lg:py-3">
      <div className="container general-header-container ">
        <div className="flex items-center justify-between text-white px-5 py-2">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium brand-name flex items-center gap-2"
          >
            <Image
              src="/images/logo_with_line_text.png"
              width={63}
              height={80}
              alt="logo"
              loading="lazy"
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>

          {session && !isTokenExpired(token) ? (
            <div className="profile-section flex flex-row gap-2 items-center">
              <div
                className="flex flex-row gap-2 items-center avatar-name-section"
                onClick={() => router.push("/account")}
              >
                <img
                  src={
                    session?.user?.image === null ||
                    session?.user?.image === undefined
                      ? generateFallbackAvatar(session?.user?.name!)
                      : session?.user?.image
                  }
                  alt="avatar"
                />

                <p className="name">{session.user.name}</p>
              </div>
              <BiLogOut
                onClick={() => {
                  signOut({ callbackUrl: "http://localhost:3000/" });
                }}
                className="logout-icon w-5 h-5 cursor-pointer"
              />
            </div>
          ) : (
            <button
              className="hidden lg:inline-block btn-login cursor-pointer"
              onClick={() => {
                router.push("/login");
              }}
            >
              <p className="font-medium">Đăng nhập</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderHomePage;
