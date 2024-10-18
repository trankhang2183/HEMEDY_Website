import { ProductType } from "@utils/enum";

export interface ProductSession {
  id: number;
  product_name: string;
  description?: string;
  product_type: ProductType;
  price: string;
  number_lesson?: string;
  detail: string[];
  image?: string;
}

export interface VideoListSession {
  product_type: ProductType;
  total_duration: string;
  list_video: VideoItemSession[];
  created_at: string;
  language: string;
  total_video: string;
  description: string;
}

export interface VideoItemSession {
  link_video: string;
  title: string;
  duration: string;
}
