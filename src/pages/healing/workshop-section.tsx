import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { WorkshopType } from "@/types/workshop.type";
import ItemWorkshop from "@components/healingPageComponent/ItemWorkshop";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const workshop_list_tmp: WorkshopType[] = [
  {
    id: 1,
    title: "Làm bánh",
    type: "Những workshop thú vị",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://cdn.sgtiepthi.vn/wp-content/uploads/2022/03/262033436_654854635923878_4539608096656278712_n.jpg",
  },
  {
    id: 2,
    title: "Làm bánh",
    type: "Những workshop thú vị",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://cdn.sgtiepthi.vn/wp-content/uploads/2022/03/262033436_654854635923878_4539608096656278712_n.jpg",
  },
  {
    id: 3,
    title: "Làm bánh",
    type: "Những workshop thú vị",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://cdn.sgtiepthi.vn/wp-content/uploads/2022/03/262033436_654854635923878_4539608096656278712_n.jpg",
  },
  {
    id: 4,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 5,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
  {
    id: 6,
    title: "Tô tượng",
    type: "Những workshop nghệ thuật",
    subtitle: "Địa điểm dành cho những tín đồ yêu thích làm bánh.",
    content: "data test",
    representative_img:
      "https://2saigon.vn/wp-content/uploads/2022/05/quan-ca-phe-to-tuong-o-tp-hcm_6290240129d6d-scaled.jpeg",
  },
];

const WorkshopSection = () => {
  const router = useRouter();

  const [showAllInteresting, setShowAllInteresting] = useState(false);
  const [showAllArt, setShowAllArt] = useState(false);

  const interestingWorkshops = workshop_list_tmp.filter(
    (workshop) => workshop.type === "Những workshop thú vị"
  );

  const artWorkshops = workshop_list_tmp.filter(
    (workshop) => workshop.type === "Những workshop nghệ thuật"
  );

  const displayedInterestingWorkshops = showAllInteresting
    ? interestingWorkshops
    : interestingWorkshops.slice(0, 8);

  const displayedArtWorkshops = showAllArt
    ? artWorkshops
    : artWorkshops.slice(0, 8);

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