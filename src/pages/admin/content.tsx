"use client";

import { ContentType } from "@/types/statistics";
import statistics from "@services/statistics";
import { list_content_admin, toastError } from "@utils/global";
import { Skeleton, Spin } from "antd";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Content = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<ContentType | null>(null);

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

  useEffect(() => {
    const fetchTransactions = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetCountContent =
            await statistics.getCountContentManage(session.user.access_token);

          setOriginalData(responseGetCountContent);
        } catch (error: any) {
          toast.error("Có lỗi khi tải dữ liệu");
          toastError(error);
          console.error("Có lỗi khi tải dữ liệu:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTransactions();
  }, [session?.user.access_token]);

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

          {isLoading ? (
            <div className="flex list-content flex-row gap-6 items-center flex-wrap">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton.Input
                  key={index}
                  active
                  style={{
                    width: "382px",
                    height: "400px",
                    borderRadius: "20px",
                  }}
                />
              ))}
            </div>
          ) : !selectedComponent ? (
            <div className="flex list-content flex-row gap-6 items-center flex-wrap">
              {list_content_admin.map((item) => (
                <div
                  className="item flex flex-col justify-between cursor-pointer"
                  key={item.key}
                  style={{ backgroundColor: `${item.backgroundColor}` }}
                  onClick={() => handleItemClick(item)}
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
                      <span className="text-6xl font-medium">
                        {originalData && item.type in originalData
                          ? originalData[item.type as keyof ContentType]
                          : 0}
                      </span>{" "}
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
