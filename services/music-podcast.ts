import {
  CreateMusicPodcastType,
  MusicPodcastType,
  UpdateMusicPodcastType,
} from "@/types/music-podcast.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllMusicPodCastList = async (): Promise<MusicPodcastType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.musicPodcast.getAllMusicPodCastList}`,
  });
  return response.data;
};

const createMusicPodcast = async (
  token: string,
  model: CreateMusicPodcastType
): Promise<MusicPodcastType> => {

  const response = await httpClient.post({
    url: `${apiLinks.musicPodcast.addNewMusicPodcast}`,
    token: token,
    data: model,
  });
  return response.data;
};

const updateMusicPodcast = async (
  token: string,
  model: CreateMusicPodcastType,
  podcastId: string
): Promise<UpdateMusicPodcastType> => {
  const response = await httpClient.put({
    url: `${apiLinks.musicPodcast.updateMusicPodcast}/${podcastId}`,
    token: token,
    data: model,
  });
  return response.data;
};

const deleteMusicPodcast = async (
  token: string,
  podcastId: string
): Promise<UpdateMusicPodcastType> => {
  const response = await httpClient.delete({
    url: `${apiLinks.musicPodcast.deleteMusicPodcast}/${podcastId}`,
    token: token,
  });
  return response.data;
};

const musicPodcast = {
  getAllMusicPodCastList,
  createMusicPodcast,
  deleteMusicPodcast,
  updateMusicPodcast,
};

export default musicPodcast;
