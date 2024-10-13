import dynamic from "next/dynamic";
import React from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Professional = () => {
  return <ManagerLayoutNoSSR content={<div>Professional</div>} />;
};

export default Professional;
