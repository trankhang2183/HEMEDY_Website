import { BodyCreateScheduledType, ScheduledType } from "@/types/scheduled.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllScheduledOfCustomer = async (
  token: string
): Promise<ScheduledType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.scheduled.getAllScheduledOfCustomer}`,
    token: token,
  });
  return response.data;
};

const getAllSlotFreeOfDoctor = async (
  token: string,
  doctor_id: string,
  date: string
): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.scheduled.getAllSlotFreeOfDoctor}/${doctor_id}/${date}`,
    token: token,
  });
  return response.data;
};

const createScheduled = async (
  token: string,
  model: BodyCreateScheduledType
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.scheduled.createScheduled}`,
    token: token,
    data: model,
  });
  return response.data;
};

const scheduled = {
  getAllScheduledOfCustomer,
  getAllSlotFreeOfDoctor,
  createScheduled,
};

export default scheduled;
