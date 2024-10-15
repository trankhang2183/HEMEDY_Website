import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { WorkshopType } from "@/types/workshop.type";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { scrollToElement } from "@utils/global";
import workshop from "@services/workshop";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const WorkshopDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workshopListData, setWorkshopData] = useState<WorkshopType>();

  useEffect(() => {
    const fetchWorkshopList = async () => {
      setIsLoading(true);
      try {
        const responseGetWorkshopById = await workshop.getWorkshopById(
          id as string
        );

        setWorkshopData(responseGetWorkshopById);
      } catch (error: any) {
        toast.error("Có lỗi khi tải dữ liệu");
        toast.error(error!.response?.data?.message);
        console.error("Có lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshopList();
  }, []);

  useEffect(() => {
    scrollToElement("workshop-content");
  }, []);

  return (
    <HomeLayoutNoSSR
      content={
        <div className="package-workshop-section">
          <div className="">
            <div className="banner text-center pb-10">
              <div className="container">
                <button
                  className="back-button-return flex items-center gap-3 justify-center"
                  onClick={() => router.back()}
                >
                  <IoReturnUpBack />
                  Quay lại
                </button>
              </div>
              <h1 className="text-5xl pt-4">
                Những workshop thú vị <br></br>đầy thư giản
              </h1>
              <p className="color-white text-base pt-4 pb-7">
                Tại Hemedy, chúng tôi mang đến những trải nghiệm âm nhạc,
                podcast và blog giúp bạn tìm lại sự bình <br></br>yên trong tâm
                hồn. Tham gia các workshop và khám phá thêm về hành trình chữa
                lành của bạn.
              </p>
              <Image
                src="/images/workshop-banner.png"
                width={1202}
                height={472}
                alt="avatar_doc"
                loading="lazy"
              />
            </div>
          </div>

          <div className="container-list container">
            {isLoading ? (
              <div className="w-full flex justify-center items-center h-screen">
                <Spin spinning={isLoading} />
              </div>
            ) : (
              <div id="workshop-content">
                <h1 className="text-center font-bold text-4xl mb-7">
                  {workshopListData?.title}
                </h1>
                <div
                  className="w-fit"
                  style={{
                    padding: "10px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: workshopListData?.content!,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default WorkshopDetail;
