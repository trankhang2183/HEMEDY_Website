import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrSecure } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import useDispatch from "@hooks/use-dispatch";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { signIn } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { emailRegex } from "@utils/helpers";
import { ROLE_CUSTOMER } from "@utils/constants";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

// const callback_url = "http://localhost:3000/manage";
const callback_url = "http://hemedy.onrender.com";

const LoginSection: React.FC<Props> = (props) => {
  const { setIsLogin } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      signIn("google", { callbackUrl: `${callback_url}` });
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
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
        role: ROLE_CUSTOMER,
      });

      if (response?.error) {
        return message.error("Sai thông tin đăng nhập!", 1.5);
      } else {
        message.success("Đăng nhập thành công!", 1.5);
        return router.push("/account");
      }
    } catch (error) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container login-section">
      <div className="left">
        <img src="/images/login-img.png" alt={"login-img"} loading="lazy" />
      </div>

      <div className="right">
        <div className="content">
          <h1 className="font-semibold text-center">Chào Mừng Trở Lại</h1>
          <p className="text-center font-medium mt-2">
            Đăng nhập để có một trải nghiệm đầy đủ
          </p>
          <div
            aria-disabled={isLoading}
            className="mt-7 btn-login-gg flex items-center justify-center gap-2"
            onClick={handleLoginWithGoogle}
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

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <div className="my-6 flex flex-row items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="forgot-checkbox"
                  className="cursor-pointer"
                />
                <label
                  htmlFor="forgot-checkbox"
                  className="cursor-pointer font-semibold ml-2"
                >
                  Ghi nhớ
                </label>
              </div>
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

          <p className="text-center mt-6 text-register font-semibold">
            Chưa phải thành viên?{" "}
            <span onClick={() => setIsLogin(false)}>Hãy đăng ký tài khoản</span>
          </p>
        </div>
      </div>
      {isLoading && <SpinnerLoading />}
    </div>
  );
};

export default LoginSection;
