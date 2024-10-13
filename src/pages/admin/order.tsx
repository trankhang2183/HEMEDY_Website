import dynamic from "next/dynamic";
import React from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Order = () => {
  return <ManagerLayoutNoSSR content={<div>order</div>} />;
};

export default Order;
