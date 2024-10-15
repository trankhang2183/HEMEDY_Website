"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import HomeLayout from "@layout/HomeLayout";
import Image from "next/image";

import { useRouter } from "next/navigation";
import ItemBlog from "@components/healingPageComponent/ItemBlog";
import ItemWorkshop from "@components/healingPageComponent/ItemWorkshop";
import { BlogType } from "@/types/blog.type";
import { WorkshopType } from "@/types/workshop.type";
import { toast } from "react-toastify";
import workshop from "@services/workshop";
import blog from "@services/blog";
import { Spin } from "antd";
import { scrollToElement } from "@utils/global";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const HealingPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [workshopListData, setWorkshopListData] = useState<WorkshopType[]>([]);
  const [blogListData, setBlogListData] = useState<BlogType[]>([]);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      scrollToElement(scrollPosition);
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  const handleViewAllClick = (sectionId, path: string) => {
    sessionStorage.setItem("scrollPosition", sectionId);
    router.push(path);
  };

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

  useEffect(() => {
    const fetchBlogList = async () => {
      setIsLoading(true);
      try {
        const responseGetAllBlog = await blog.getAllBlogList();

        const sortedBlogsList = responseGetAllBlog.sort(
          (a: BlogType, b: BlogType) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );

        setBlogListData(sortedBlogsList);
      } catch (error: any) {
        toast.error("Có lỗi khi tải dữ liệu");
        toast.error(error!.response?.data?.message);
        console.error("Có lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogList();
  }, []);

  return (
    <HomeLayoutNoSSR
      content={
        <div className="package-healing-page">
          <div className="banner flex flex-col justify-center items-center">
            <h1 className="text-center mt-10 font-bold text-5xl">
              Khám phá sự chữa lành tinh thần <br></br> cùng Hemedy
            </h1>
            <p className="text-white text-center mt-10 mb-10">
              Tại Hemedy, chúng tôi mang đến những trải nghiệm âm nhạc, podcast
              và blog giúp bạn tìm lại sự bình yên trong <br></br>
              tâm hồn. Tham gia các workshop và khám phá thêm về hành trình chữa
              lành của bạn.
            </p>
            <Image
              src="/images/banner-healing.png"
              width={1400}
              height={472}
              alt="avatar_doc"
              className="mb-12"
              loading="lazy"
            />
          </div>

          <div
            id="music-view-all-button"
            className="music-section relative flex justify-center items-center pt-16"
          >
            <Image
              src="/images/music-page.png"
              width={1400}
              height={600}
              alt="avatar_doc"
              className="mb-12"
              loading="lazy"
            />
            <div className="container absolute">
              <div
                className="btn-change-page absolute top-1/2 left-16"
                onClick={() =>
                  handleViewAllClick(
                    "music-view-all-button",
                    "/healing/music-section"
                  )
                }
              >
                Tham gia
              </div>
            </div>
          </div>

          <div
            id="podcast-view-all-button"
            className="banner flex flex-col justify-center items-center"
          >
            <h1 className="text-center mt-10 font-bold text-5xl">
              Podcast với những câu chuyện <br></br>và sự chia sẻ rất gần gủi
            </h1>
            <p className="text-white text-center mt-10 mb-10">
              Những lời tâm sự, chia sẻ thật lòng của những người đã vượt qua
              mọi thứ, biết đâu bạn sẽ thấy chính mình trong câu chuyện.
            </p>
            <Image
              src="/images/Mask group.png"
              width={1400}
              height={500}
              alt="avatar_doc"
              objectFit="cover"
              loading="lazy"
            />
            <div
              className="btn-change-page my-6"
              onClick={() =>
                handleViewAllClick(
                  "podcast-view-all-button",
                  "/healing/podcast-section"
                )
              }
            >
              Xem ngay
            </div>
          </div>

          <div className="blog-section" id="blog-view-all-button">
            <div className="container">
              <div className="header flex items-center justify-between px-8">
                <h1 className="text-3xl">
                  Khám phá các bài viết về <br></br>chữa lành tinh thần
                </h1>
                <div
                  className="btn-view-all"
                  onClick={() =>
                    handleViewAllClick(
                      "blog-view-all-button",
                      "/healing/blog-section"
                    )
                  }
                >
                  Tất cả
                </div>
              </div>

              {isLoading ? (
                <div className="container flex justify-center items-center mt-6 h-[500px]">
                  <Spin spinning={isLoading} />
                </div>
              ) : (
                <div className="blog-list gird grid-cols-3 gap-8 px-8 mt-6">
                  {blogListData.slice(0, 3).map((blog, index) => (
                    <ItemBlog blog={blog} key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="workshop-section mb-10" id="workshop-view-all-button">
            <div className="container">
              <div className="header flex items-center justify-between px-8">
                <h1 className="text-3xl">
                  Những workshop thú vị <br></br>đầy thư giản
                </h1>
                <div
                  className="btn-view-all"
                  onClick={() =>
                    handleViewAllClick(
                      "workshop-view-all-button",
                      "/healing/workshop-section"
                    )
                  }
                >
                  Tất cả
                </div>
              </div>

              {isLoading ? (
                <div className="container flex justify-center items-center mt-6 h-[500px]">
                  <Spin spinning={isLoading} />
                </div>
              ) : (
                <div className="workshop-list gird grid-cols-4 gap-4 px-8 mt-6">
                  {workshopListData.slice(0, 4).map((workshop, index) => (
                    <ItemWorkshop workshop={workshop} key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default HealingPage;
