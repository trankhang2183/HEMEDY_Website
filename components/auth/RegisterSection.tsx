import customer from "@services/customer";
import { emailRegex } from "@utils/helpers";
import { message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrSecure } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

// const callback_url = "http://localhost:3000/manage";
const callback_url = "http://hemedy.onrender.com";

const RegisterSection: React.FC<Props> = (props) => {
  const { setIsLogin } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLoginWithGoogle = async () => {
    try {
      signIn("google", { callbackUrl: `${callback_url}` });
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    setError("");

    if (!email || !password || !name) {
      setError("Vui lòng không để trống tên, email và mật khẩu!");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email không hợp lệ!");
      setIsLoading(false);
      return;
    }

    if (!isChecked) {
      setError(
        "Vui lòng đồng ý với các điều khoản và chính sách trước khi đăng ký!"
      );
      return;
    }

    try {
      setIsLoading(true);

      const responseRegister = await customer.registerByCustomer(
        name,
        email,
        password
      );

      if (responseRegister) {
        message.success("Đăng ký thành công!", 1.5);

        const responseSignin = await signIn("cus_credentials", {
          redirect: false,
          email: email,
          password: password,
        });

        if (!responseSignin?.error) {
          return router.push("/account");
        }
      }
    } catch (err: any) {
      console.error("Error creating account:", err);
      message.error(err!.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container login-section">
      <div className="left">
        <img src="/images/signup-img.png" alt={"signup-img"} loading="lazy" />
      </div>

      <div className="right">
        <div className="content">
          <h1 className="font-semibold text-center">Tạo Tài Khoản Mới</h1>
          <p className="text-center font-medium mt-2">
            Tạo tài khoản ngay để tham gia vào Hemedy
          </p>
          <div
            className="mt-7 btn-login-gg flex items-center justify-center gap-2"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle className="w-5 h-5" />{" "}
            <span className="font-medium">Đăng nhập với Google</span>
          </div>

          <div className="line-text font-medium my-7">Hoặc</div>

          <div className="input-field relative">
            <input
              type="text"
              required
              placeholder="Nhập tên của bạn"
              className="font-semibold text-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <IoPerson className="absolute left-3 w-6 h-6 opacity-30" />
          </div>

          <div className="input-field relative mt-6">
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

          <div className="my-6 flex flex-row items-center justify-between">
            <div>
              <input
                type="checkbox"
                id="forgot-checkbox"
                className="cursor-pointer"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label
                htmlFor="forgot-checkbox"
                className="cursor-pointer font-semibold ml-2"
              >
                Tôi đồng ý với điều khoản và chính sách
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mt-2 mb-2">{error}</p>
          )}

          <div
            className="btn-action-login-register text-center text-lg cursor-pointer"
            onClick={handleRegister}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </div>
          <p className="text-center mt-6 text-register font-semibold">
            Đã có tài khoản?{" "}
            <span onClick={() => setIsLogin(true)}>Đăng nhập</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
