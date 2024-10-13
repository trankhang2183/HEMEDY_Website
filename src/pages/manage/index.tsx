"use client";

import SpinnerLoading from "@components/loading/SpinnerLoading";
import { setSliderMenuItemSelectedKey } from "@slices/global";
import { ROLE_ADMIN, ROLE_DOCTOR } from "@utils/constants";
import { emailRegex } from "@utils/helpers";
import { message } from "antd";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrSecure } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ManageLoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleLoginWithEmailPassword = async (
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      if (!email || !password) {
        setError("Vui lòng không để trống email hoặc mật khẩu!");
        setIsLoading(false);
        return;
      }

      if (!isValidEmail(email)) {
        setError("Email không hợp lệ!");
        setIsLoading(false);
        return;
      }

      const response = await signIn("cus_credentials", {
        redirect: false,
        email: email,
        password: password,
        role: ROLE_ADMIN,
      });

      if (response?.error) {
        return message.error("Đăng nhập thất bại!", 1.5);
      } else {
        message.success("Đăng nhập thành công!", 1.5);

        if (email.includes("admin")) {
          dispatch(setSliderMenuItemSelectedKey("/admin/dashboard"));
          router.push("/admin/dashboard");
        } else {
          dispatch(setSliderMenuItemSelectedKey("/doctor/calendar"));
          router.push("/doctor/calendar");
        }
      }
    } catch (error) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user.roles) {
      const role = session.user.roles;
      const path =
        role === ROLE_ADMIN ? "/admin/dashboard" : "/doctor/calendar";
      dispatch(setSliderMenuItemSelectedKey(path));
      router.push(path);
    }
  }, [session]);

  return (
    <div className="manage-login-page flex justify-center items-center">
      <div className="container flex flex-row justify-center items-center">
        <div className="left py-14">
          <div className="flex flex-col justify-center items-center">
            <div className="logo">
              <Image
                src="/images/logo-with-green-text.png"
                width={50}
                height={70}
                alt="logo"
                loading="lazy"
              />
            </div>

            <div className="content">
              <h1 className="font-semibold text-center">Chào Mừng Trở Lại</h1>
              <p className="text-center font-medium mt-2">
                Đăng nhập để có một trải nghiệm đầy đủ
              </p>
              <div
                aria-disabled={isLoading}
                className="mt-7 btn-login-gg flex items-center justify-center gap-2"
                onClick={() => {
                  toast.error("Tính năng chưa hỗ trợ vui lòng thử lại sau!");
                }}
              >
                <FcGoogle className="w-5 h-5" />{" "}
                <span className="font-medium">Đăng nhập với Google</span>
              </div>

              <div className="line-text font-medium my-7">Hoặc</div>

              <form onSubmit={handleLoginWithEmailPassword}>
                <div className="input-field relative">
                  <input
                    type="text"
                    required
                    placeholder="Nhập email"
                    className="font-semibold text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdOutlineMail className="absolute left-3 w-6 h-6 opacity-30" />
                </div>

                <div className="input-field relative mt-6">
                  <input
                    type="password"
                    required
                    placeholder="Mật khẩu"
                    className="font-semibold text-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <GrSecure className="absolute left-3 w-6 h-6 opacity-30" />
                </div>

                {error && (
                  <p className="text-red-500 text-center mt-2">{error}</p>
                )}

                <div className="my-6 flex flex-row items-center justify-between">
                  <p className="forgot font-semibold">Quên mật khẩu?</p>
                </div>

                <button
                  type="submit"
                  className="btn-action-login-register text-center text-lg cursor-pointer"
                  disabled={isLoading}
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="right ">
          <div>
            <img src="/images/manage-login.svg" loading="lazy" />
          </div>
        </div>
      </div>
      {isLoading && <SpinnerLoading />}
    </div>
  );
};

export default ManageLoginPage;
