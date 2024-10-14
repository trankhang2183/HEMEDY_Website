import { BlogType } from "@/types/blog.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllBlogList = async (): Promise<BlogType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.blog.getAllBlogList}`,
  });
  return response.data;
};

const createBlog = async (
  token: string,
  model: BlogType
): Promise<BlogType> => {
  const response = await httpClient.post({
    url: `${apiLinks.blog.createBlog}`,
    token: token,
    data: model,
  });
  return response.data;
};

const updateBlog = async (
  token: string,
  model: BlogType,
  blogId: string
): Promise<BlogType> => {
  const response = await httpClient.put({
    url: `${apiLinks.blog.updateBlog}/${blogId}`,
    token: token,
    data: model,
  });
  return response.data;
};

const deleteBlog = async (token: string, blogId: string): Promise<any> => {
  const response = await httpClient.delete({
    url: `${apiLinks.blog.deleteBlog}/${blogId}`,
    token: token,
  });
  return response.data;
};

const blog = {
  getAllBlogList,
  createBlog,
  deleteBlog,
  updateBlog,
};

export default blog;
