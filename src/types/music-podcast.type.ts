export interface MusicPodcastType {
  _id?: string;
  name: string;
  audio_link?: string;
  img_url?: string;
  author: string;
  type: string;
  category: string;
  listen_quantity: number;
  favorite_quantity: number;
  createdAt?: string;
}

export interface CreateMusicPodcastType
  extends Omit<MusicPodcastType, "listen_quantity" | "favorite_quantity"> {}

export interface UpdateMusicPodcastType extends CreateMusicPodcastType {}
