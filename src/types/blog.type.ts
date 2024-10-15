import { BlogTypeEnum } from "@utils/enum";

export interface BlogType {
  id?: number;
  _id?: string;
  title: string;
  type: string;
  content: string;
  category: string;
  created_at?: string;
  representative_img: string;
  createdAt?: string;
}
