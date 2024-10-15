import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { WorkshopType } from "@/types/workshop.type";
import ItemWorkshop from "@components/healingPageComponent/ItemWorkshop";
import workshop from "@services/workshop";
import { toast } from "react-toastify";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const WorkshopSection = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workshopListData, setWorkshopListData] = useState<WorkshopType[]>([]);

  const [showAllInteresting, setShowAllInteresting] = useState(false);
  const [showAllArt, setShowAllArt] = useState(false);

  const interestingWorkshops = workshopListData.filter(
    (workshop) => workshop.type === "Những workshop thú vị"
  );

  const artWorkshops = workshopListData.filter(
    (workshop) => workshop.type === "Những workshop nghệ thuật"
  );

  const displayedInterestingWorkshops = showAllInteresting
    ? interestingWorkshops
    : interestingWorkshops.slice(0, 8);

  const displayedArtWorkshops = showAllArt
    ? artWorkshops
    : artWorkshops.slice(0, 8);

    useEffect(() => {
      const fetchWorkshopList = async () => {
        setIsLoading(true);
        try {
          const responseGetAllWorkshop = await workshop.getAllWorkshopList();
  
          const sortedWorkshopsList = responseGetAllWorkshop.sort(
            (a: WorkshopType, b: WorkshopType) =>
              new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
          );
  
          setWorkshopListData(sortedWorkshopsList);
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

  return (
    <HomeLayoutNoSSR
      content={
        <div className="package-workshop-section">
          <div className="">
            <div className="banner text-center pb-10">
              <div className="container">
                <button
                  className="back-button-return flex items-center gap-3 justify-center"
                  onClick={() => router.push("/healing")}
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

          <div className="container-list">
            <div className="header flex items-center justify-between px-8">
              <h1 className="text-3xl">Những workshop thú vị</h1>
              <div
                className="btn-view-all"
                onClick={() => setShowAllInteresting(!showAllInteresting)}
              >
                {showAllInteresting ? "Ẩn bớt" : "Tất cả"}
              </div>
            </div>
            <div className="workshop-list gird grid-cols-4 gap-4 px-8 mt-6">
              {displayedInterestingWorkshops.map((workshop, index) => (
                <ItemWorkshop workshop={workshop} key={index} />
              ))}
            </div>
          </div>

          <div className="container-list">
            <div className="header flex items-center justify-between px-8">
              <h1 className="text-3xl">Những workshop nghệ thuật</h1>
              <div
                className="btn-view-all"
                onClick={() => setShowAllArt(!showAllArt)}
              >
                {showAllArt ? "Ẩn bớt" : "Tất cả"}
              </div>
            </div>
            <div className="workshop-list gird grid-cols-4 gap-4 px-8 mt-6">
              {displayedArtWorkshops.map((workshop, index) => (
                <ItemWorkshop workshop={workshop} key={index} />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default WorkshopSection;
