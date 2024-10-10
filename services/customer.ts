import { ResponseGetAllDoctorType } from "@/types/user.type";
import { ParamGet, ParamGetWithId } from "@models/base";
import {
  CustomerCreateModel,
  CustomerUpdateModel,
  CustomerData,
  CusParam,
  ChangePassword,
} from "@models/customer";
import {
  DriverCreateModel,
  LoginResponse,
  RegisterDriverByAdminModel,
  UpdatePriorityModel,
  User,
  UserId,
  UserListData,
} from "@models/user";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getCustomerProfile = async (
  token: string,
  email: string
): Promise<any> => {
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

const loginWithGoogle = async (token: string): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.customer.loginWithGoogle}`,
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
  getAllDoctorByGuest,
  registerByCustomer,
};

export default customer;
