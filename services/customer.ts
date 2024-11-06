import { LessonType } from "@/types/session.type";
import {
  ResponseGetAllDoctorType,
  ResponseGetALlUserByAdmin,
  UserType,
} from "@/types/user.type";
import { LoginResponse } from "@models/user";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getCustomerProfile = async (
  token: string,
  email: string
): Promise<UserType> => {
  const response = await httpClient.get({
    url: `${apiLinks.customer.getProfile}/${email}`,
    token: token,
  });
  return response.data;
};

const getAllDoctorByGuest = async (): Promise<ResponseGetAllDoctorType> => {
  const response = await httpClient.get({
    url: `${apiLinks.customer.getAllDoctorByGuest}`,
  });
  return response.data;
};

const getAllUsersByAdmin = async (
  token: string
): Promise<ResponseGetALlUserByAdmin> => {
  const response = await httpClient.get({
    url: `${apiLinks.customer.getAllUsersByAdmin}`,
    token: token,
  });
  return response.data;
};

const loginWithCustomerEmail = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await httpClient.post({
    url: apiLinks.customer.loginWithCustomerEmail,
    data: {
      email: email,
      password: password,
    },
  });
  return response.data;
};

const loginWithAdminDoctorEmail = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await httpClient.post({
    url: apiLinks.customer.loginWithAdminDoctorEmail,
    data: {
      email: email,
      password: password,
    },
  });
  return response.data;
};

const loginWithGoogle = async (token: string): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.customer.loginWithGoogle}`,
    data: {
      token: token,
    },
  });
  return response.data;
};

const loginWithGoogleByAdminDoctor = async (token: string): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.customer.loginWithGoogleByAdminDoctor}`,
    data: {
      token: token,
    },
  });
  return response.data;
};

const registerByCustomer = async (
  fullname: string,
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await httpClient.post({
    url: apiLinks.customer.registerByCustomer,
    data: {
      fullname: fullname,
      email: email,
      password: password,
    },
  });
  return response.data;
};

const customer = {
  getCustomerProfile,
  loginWithCustomerEmail,
  loginWithGoogle,
  loginWithAdminDoctorEmail,
  loginWithGoogleByAdminDoctor,
  getAllDoctorByGuest,
  getAllUsersByAdmin,
  registerByCustomer,
};

export default customer;
