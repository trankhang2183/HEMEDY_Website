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


