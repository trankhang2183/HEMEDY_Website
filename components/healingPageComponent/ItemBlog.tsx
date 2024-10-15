import { BlogType } from "@/types/blog.type";
import React from "react";

interface Props {
  blog: BlogType;
}

const ItemBlog: React.FC<Props> = (props) => {
  const { blog } = props;

  return (
    <div className="blog-item w-full relative">
      <img src={blog.representative_img} alt={blog.type} loading="lazy" />
      <div className="overlay"></div>
      <div className="absolute bottom-0 left-0 z-30 content w-full">
        <h3 className="text-white text-2xl">{blog.title}</h3>
        <p className="mt-5 text-white">{blog.created_at}</p>
      </div>
    </div>
  );
};

export default ItemBlog;
