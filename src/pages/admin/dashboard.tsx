"use client";

import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <ManagerLayoutNoSSR
      content={
        <div className="flex items-center justify-center">
          <img
            src="/images/dashboard-tmp.png"
            alt={"dashboard-img"}
            loading="lazy"
            style={{
              maxWidth: "98%",
              objectFit: "cover",
            }}
          />
        </div>
        
      }
    />
  );
};

export default Dashboard;
