import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllNotification = async (token: string): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.notifications.getAllNotification}`,
    token: token,
  });
  return response.data;
};

const markOneNotification = async (
  token: string,
  notiId: string
): Promise<any> => {
  const response = await httpClient.patch({
    url: `${apiLinks.notifications.markOneNotification}/${notiId}`,
    token: token,
  });
  return response.data;
};

const markAllNotifications = async (token: string): Promise<any> => {
  const response = await httpClient.patch({
    url: `${apiLinks.notifications.markAllNotifications}`,
    token: token,
  });
  return response.data;
};

const notification = {
  getAllNotification,
  markOneNotification,
  markAllNotifications,
};

export default notification;
