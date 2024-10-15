"use client"

import { list_content_admin } from "@utils/global";
import dynamic from "next/dynamic";
import React, { useState } from "react";


const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});


const Content = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(["Nội dung"]);

  const handleItemClick = (item: any) => {
    setSelectedComponent(item.component);
    setBreadcrumb(["Nội dung", item.title]);
  };

  const handleBackToList = () => {
    setSelectedComponent(null);
    setBreadcrumb(["Nội dung"]);
  };


  return (
    <ManagerLayoutNoSSR
      content={
        <div className="manage-content-container flex flex-col">
          <div className="breadcrumb text-lg  mb-4">
            {breadcrumb.map((crumb, index) => (
              <span key={index}>
                {index > 0 && " > "}
                {index === breadcrumb.length - 1 ? (
                  crumb
                ) : (
                  <a href="#" onClick={handleBackToList} className="back-page">
                    {crumb}
                  </a>
                )}
              </span>
            ))}
          </div>

          {!selectedComponent ? (
            <div className="flex list-content flex-row gap-6 items-center flex-wrap">
              {list_content_admin.map((item) => (
                <div
                  className="item flex flex-col justify-between cursor-pointer"
                  key={item.key}
                  style={{ backgroundColor: `${item.backgroundColor}` }}
                  onClick={() => handleItemClick(item)} // Xử lý khi bấm vào item
                >
                  <div className="flex flex-col gap-4">
                    <div className="icon-container flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p
                      className="title text-xl font-semibold"
                      style={{ color: `${item.color}` }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: `${item.color}` }}
                    >
                      <span className="text-6xl font-medium">1000</span>{" "}
                      {item.description}
                    </p>
                  </div>
                  <div className="btn-edit-update font-semibold text-lg">
                    Chi tiết/ chỉnh sửa
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>{selectedComponent}</div>
          )}
        </div>
      }
    />
  );
};

export default Content;
