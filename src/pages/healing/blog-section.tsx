import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ItemBlog from "@components/healingPageComponent/ItemBlog";
import { BlogType } from "@/types/blog.type";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const blog_list_tmp: BlogType[] = [
  {
    id: 1,
    title: "Xu hướng du lịch chữa lành",
    type: "Tâm sự và chia sẽ",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 2,
    title: "Xu hướng du lịch chữa lành",
    type: "Tâm sự và chia sẽ",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 3,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 4,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 4,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 4,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 4,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 4,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
  {
    id: 4,
    title: "Suy nghĩ về mọi điều tích cực",
    type: "Kiến thức hữu ích",
    content: "data test",
    category: "travel",
    created_at: "18 tháng 6 năm 2023",
    representative_img:
      "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/18/du-lich-chua-lanh-la-gi-1-1008.jpg",
  },
];

const BlogSection = () => {
  const router = useRouter();

  const [showAllSharing, setShowAllSharing] = useState(false);
  const [showAllKnowledge, setShowAllKnowledge] = useState(false);

  const sharingBlogs = blog_list_tmp.filter(
    (blog) => blog.type === "Tâm sự và chia sẽ"
  );

  const knowledgeBlogs = blog_list_tmp.filter(
    (blog) => blog.type === "Kiến thức hữu ích"
  );

  const displayedSharingBlogs = showAllSharing
    ? sharingBlogs
    : sharingBlogs.slice(0, 6);

  const displayedKnowledgeBlogs = showAllKnowledge
    ? knowledgeBlogs
    : knowledgeBlogs.slice(0, 6);

  return (
    <HomeLayoutNoSSR
      content={
        <div className="package-blog-section">
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
                Khám phá các bài viết về <br></br>chữa lành tinh thần
              </h1>
              <p className="color-white text-base pt-4 pb-7">
                Tại Hemedy, chúng tôi mang đến những trải nghiệm âm nhạc,
                podcast và blog giúp bạn tìm lại sự bình <br></br>yên trong tâm
                hồn. Tham gia các blog và khám phá thêm về hành trình chữa lành
                của bạn.
              </p>
              <Image
                src="/images/blog-banner.png"
                width={1202}
                height={472}
                alt="avatar_doc"
                loading="lazy"
              />
            </div>
          </div>

          <div className="container-list">
            <div className="header flex items-center justify-between px-8">
              <h1 className="text-3xl">Tâm sự và chia sẽ</h1>
              <div
                className="btn-view-all"
                onClick={() => setShowAllSharing(!showAllSharing)}
              >
                {showAllSharing ? "Ẩn bớt" : "Tất cả"}
              </div>
            </div>
            <div className="blog-list gird grid-cols-3 gap-4 px-8 mt-6">
              {displayedSharingBlogs.map((blog, index) => (
                <ItemBlog blog={blog} key={index} />
              ))}
            </div>
          </div>

          <div className="container-list">
            <div className="header flex items-center justify-between px-8">
              <h1 className="text-3xl">Kiến thức hữu ích</h1>
              <div
                className="btn-view-all"
                onClick={() => setShowAllKnowledge(!showAllKnowledge)}
              >
                {showAllKnowledge ? "Ẩn bớt" : "Tất cả"}
              </div>
            </div>
            <div className="blog-list gird grid-cols-3 gap-4 px-8 mt-6">
              {displayedKnowledgeBlogs.map((blog, index) => (
                <ItemBlog blog={blog} key={index} />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default BlogSection;
