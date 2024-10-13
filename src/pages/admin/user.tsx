import dynamic from "next/dynamic";
import React from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const User = () => {
  return <ManagerLayoutNoSSR content={<div>User</div>} />;
};

export default User;
