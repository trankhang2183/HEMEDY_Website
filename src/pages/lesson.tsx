"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { VIDEO_LIST_SESSION } from "@utils/constants";
import { VideoItemSession, VideoListSession } from "@/types/session.type";
import { Layout, List } from "antd";
import HeaderHomePage from "@layout/components/header/HeaderHomePage";
import { MdOutlineDateRange } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
const { Content, Sider } = Layout;

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const LessonPage = () => {
  const router = useRouter();

  const { name } = router.query;

  const decodedName = decodeURIComponent(name as string).replace(/\+/g, " ");

  let productVideos: VideoItemSession[] = [];
  let product: VideoListSession | undefined = undefined;

  product = VIDEO_LIST_SESSION.find(
    (item) => item.product_name === decodedName
  );

  if (product) {
    if (decodedName === "Yoga và Thiền") {
      const yogaProduct = VIDEO_LIST_SESSION.find(
        (item) => item.product_name === "Yoga"
      );
      const meditationProduct = VIDEO_LIST_SESSION.find(
        (item) => item.product_name === "Thiền"
      );

      if (yogaProduct && meditationProduct) {
        productVideos = yogaProduct.list_video.concat(
          meditationProduct.list_video
        );
      }
    } else {
      
      productVideos = product.list_video;
    }
  }

  const [selectedVideo, setSelectedVideo] = useState<VideoItemSession | null>(
    productVideos.length > 0 ? productVideos[0] : null
  );

  useEffect(() => {
    if (productVideos.length > 0) {
      setSelectedVideo(productVideos[0]);
    }
  }, [productVideos]);

  const handleVideoSelect = (video: VideoItemSession) => {
    setSelectedVideo(video);
  };

  return (
    <Layout className="max-h-screen background-main lesson-container">
      <HeaderHomePage />
      <Layout>
        <Content className="overflow-y-auto webkit-scrollbar">
          {selectedVideo && (
            <iframe
              width="100%"
              height="500px"
              src={selectedVideo.link_video}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <div className="video-section">
            <div className="video-details mt-4 mb-10 px-5">
              <h1 className="text-2xl font-semibold px-5">
                {product?.description_name || "Yoga và Thiền"}
              </h1>
              <div className="mt-7 px-5">
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col">
                    <p className="font-bold text-base text-black">
                      {productVideos.length}
                    </p>
                    <p className="font-normal text-gray-500">Số video </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-base text-black">
                      {product?.total_duration || "Không xác định"}
                    </p>
                    <p className="font-normal text-gray-500">
                      Tổng thời lượng{" "}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center mt-4 gap-4">
                  <MdOutlineDateRange className="w-5 h-5" />
                  <p className="text-black">{product?.created_at || ""}</p>
                </div>

                <div className="flex flex-row items-center mt-4 gap-4">
                  <GrLanguage className="w-5 h-5" />
                  <p className="text-black">{product?.language || ""}</p>
                </div>
              </div>
              <hr className="my-5" />
              <div className="mt-7 px-5 flex flex-row gap-4">
                <p className="text-black text-lg w-20">Mô tả: </p>
                <pre className="text-black text-justify text-base w-full whitespace-pre-wrap">
                  {product?.description || ""}
                </pre>
              </div>
            </div>
          </div>
        </Content>
        <Sider
          width={300}
          collapsible
          trigger={null}
          className="sider-lesson webkit-scrollbar"
        >
          <List
            itemLayout="horizontal"
            dataSource={productVideos}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleVideoSelect(item)}
                className={`video-item cursor-pointer hover:bg-gray-300 ${
                  selectedVideo?.title === item.title ? "bg-gray-300" : ""
                }`}
                style={{
                  borderRadius: "5px",
                  transition: "background-color 0.3s",
                }}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.duration}
                  className="px-5"
                />
              </List.Item>
            )}
          />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default LessonPage;
