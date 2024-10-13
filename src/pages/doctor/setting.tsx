import dynamic from "next/dynamic";
import React from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Setting = () => {
  return <ManagerLayoutNoSSR content={<div>Setting</div>} />;
};

export default Setting;
