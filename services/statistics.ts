import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getCountContentManage = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.statistics.countContent}`,
    token: token,
  });
  return response.data;
};

const getDateSale = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.statistics.dateSale}`,
    token: token,
  });
  return response.data;
};

const getRevenueCurrentWeek = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.statistics.revenueCurrentWeek}`,
    token: token,
  });
  return response.data;
};

const getRevenueMonthly = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.statistics.revenueMonthly}`,
    token: token,
  });
  return response.data;
};

const getTopServices = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.statistics.topServices}`,
    token: token,
  });
  return response.data;
};

const statistics = {
  getCountContentManage,
  getTopServices,
  getRevenueMonthly,
  getRevenueCurrentWeek,
  getDateSale,
};

export default statistics;
