"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import RegisterSection from "@components/auth/RegisterSection";
import LoginSection from "@components/auth/LoginSection";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <HomeLayoutNoSSR
      content={
        <div className="authen-page">
          {isLogin ? (
            <LoginSection setIsLogin={setIsLogin} />
          ) : (
            <RegisterSection setIsLogin={setIsLogin} />
          )}
        </div>
      }
    />
  );
};

export default LoginPage;