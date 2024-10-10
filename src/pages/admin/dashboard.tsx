import { signOut } from "next-auth/react";
import React from "react";

const callback_url = "http://localhost:3000/manage";
// const callback_url = "http://hemedy.onrender.com/manage";

const dashboard = () => {
  return (
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
  );
};

export default dashboard;
