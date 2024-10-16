import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getCountContentManage = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.statistics.countContent}`,
    token: token,
  });
  return response.data;
};

const statistics = {
  getCountContentManage,
};

export default statistics;
