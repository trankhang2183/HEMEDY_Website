import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const increaseQuantityUserVisit = async (): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.counter.increaseQuantityUserVisit}`,
  });
  return response.data;
};

const increaseQuantityListenMusic = async (): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.counter.increaseQuantityListenMusic}`,
  });
  return response.data;
};

const increaseQuantityListenPodcast = async (): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.counter.increaseQuantityListenPodcast}`,
  });
  return response.data;
};

const increaseQuantitySurvey = async (): Promise<any> => {
  const response = await httpClient.get({
    url: `${apiLinks.counter.increaseQuantitySurvey}`,
  });
  return response.data;
};

const counter = {
  increaseQuantityUserVisit,
  increaseQuantityListenMusic,
  increaseQuantityListenPodcast,
  increaseQuantitySurvey,
};

export default counter;
