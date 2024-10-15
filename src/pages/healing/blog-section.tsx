import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ItemBlog from "@components/healingPageComponent/ItemBlog";
import { BlogType } from "@/types/blog.type";
import blog from "@services/blog";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { scrollToElement } from "@utils/global";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const BlogSection = () => {
  const router = useRouter();

  const [showAllSharing, setShowAllSharing] = useState(false);
  const [showAllKnowledge, setShowAllKnowledge] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogListData, setBlogListData] = useState<BlogType[]>([]);

  const sharingBlogs = blogListData.filter(
    (blog) => blog.type === "Tâm Sự Và Chia Sẽ"
  );

  const knowledgeBlogs = blogListData.filter(
    (blog) => blog.type === "Kiến Thức Hữu Ích"
  );

  const displayedSharingBlogs = showAllSharing
    ? sharingBlogs
    : sharingBlogs.slice(0, 6);

  const displayedKnowledgeBlogs = showAllKnowledge
    ? knowledgeBlogs
    : knowledgeBlogs.slice(0, 6);

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

  useEffect(() => {
    scrollToElement("blog-content");
  }, []);

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
              <h1 className="text-3xl">Tâm Sự Và Chia Sẽ</h1>
              <div
                className="btn-view-all"
                onClick={() => setShowAllSharing(!showAllSharing)}
              >
                {showAllSharing ? "Ẩn bớt" : "Tất cả"}
              </div>
            </div>
            {isLoading ? (
              <div className="container flex justify-center items-center mt-6 h-[500px]">
                <Spin spinning={isLoading} />
              </div>
            ) : (
              <div className="blog-list gird grid-cols-3 gap-4 px-8 mt-6">
                {displayedSharingBlogs.map((blog, index) => (
                  <ItemBlog blog={blog} key={index} />
                ))}
              </div>
            )}
          </div>

          <div className="container-list">
            <div className="header flex items-center justify-between px-8" id="blog-content">
              <h1 className="text-3xl">Kiến Thức Hữu Ích</h1>
              <div
                className="btn-view-all"
                onClick={() => setShowAllKnowledge(!showAllKnowledge)}
              >
                {showAllKnowledge ? "Ẩn bớt" : "Tất cả"}
              </div>
            </div>

            {isLoading ? (
              <div className="container flex justify-center items-center mt-6 h-[500px]">
                <Spin spinning={isLoading} />
              </div>
            ) : (
              <div className="blog-list gird grid-cols-3 gap-4 px-8 mt-6">
                {displayedKnowledgeBlogs.map((blog, index) => (
                  <ItemBlog blog={blog} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default BlogSection;
