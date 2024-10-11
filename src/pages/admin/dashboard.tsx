import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";

const AdminLayoutNoSSR = dynamic(() => import("@layout/AdminLayout"), {
  ssr: false,
});

// const callback_url = "http://localhost:3000/manage";
const callback_url = "http://hemedy.onrender.com/manage";

const dashboard = () => {
  return (
    <AdminLayoutNoSSR
      content={
        <div>
          dashboard
          <div
            onClick={() => {
              signOut({ callbackUrl: `${callback_url}` });
            }}
          >
            Sign out
          </div>
        </div>
      }
    />
  );
};

export default dashboard;
