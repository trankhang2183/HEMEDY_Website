import { WorkshopType } from "@/types/workshop.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllWorkshopList = async (): Promise<WorkshopType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.workshop.getAllWorkshopList}`,
  });
  return response.data;
};

const createWorkshop = async (
  token: string,
  model: WorkshopType
): Promise<WorkshopType> => {
  const response = await httpClient.post({
    url: `${apiLinks.workshop.createWorkshop}`,
    token: token,
    data: model,
  });
  return response.data;
};

const updateWorkshop = async (
  token: string,
  model: WorkshopType,
  workshopId: string
): Promise<WorkshopType> => {
  const response = await httpClient.put({
    url: `${apiLinks.workshop.updateWorkshop}/${workshopId}`,
    token: token,
    data: model,
  });
  return response.data;
};

const deleteWorkshop = async (token: string, workshopId: string): Promise<any> => {
  const response = await httpClient.delete({
    url: `${apiLinks.workshop.deleteWorkshop}/${workshopId}`,
    token: token,
  });
  return response.data;
};

const workshop = {
  getAllWorkshopList,
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
};

export default workshop;
