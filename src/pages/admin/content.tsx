import dynamic from "next/dynamic";
import React from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Content = () => {
  return <ManagerLayoutNoSSR content={<div>content</div>} />;
};

export default Content;
