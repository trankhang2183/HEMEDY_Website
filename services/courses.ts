import { CoursesType } from "@/types/courses.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllCoursesList = async (token: string): Promise<CoursesType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.course.getAllCourses}`,
    token: token,
  });
  return response.data;
};

const createCourses = async (
  token: string,
  model: CoursesType
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.course.createCourses}`,
    token: token,
    data: model,
  });
  return response.data;
};

const getCoursesById = async (
  token: string,
  courseId: string
): Promise<CoursesType> => {
  const response = await httpClient.get({
    url: `${apiLinks.course.getCoursesById}/${courseId}`,
    token: token,
  });
  return response.data;
};

const course = {
  getAllCoursesList,
  createCourses,
  getCoursesById,
};

export default course;
