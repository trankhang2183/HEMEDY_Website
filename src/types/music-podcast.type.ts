export interface MusicPodcastType {
  _id?: string;
  name: string;
  audio_link?: string;
  audioLink?: string;
  img_url?: string;
  imgUrl?: string;
  author: string;
  type: string;
  category: string;
  listen_quantity: number;
  favorite_quantity: number;
}

export interface CreateMusicPodcastType
  extends Omit<MusicPodcastType, "listen_quantity" | "favorite_quantity"> {}

export interface UpdateMusicPodcastType extends CreateMusicPodcastType {}
