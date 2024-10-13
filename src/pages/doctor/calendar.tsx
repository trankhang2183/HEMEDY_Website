import dynamic from "next/dynamic";
import React from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Calendar = () => {
  return <ManagerLayoutNoSSR content={<div>Calendar</div>} />;
};

export default Calendar;
