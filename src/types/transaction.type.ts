import { UserType } from "./user.type";

export interface TransactionType {
  _id: string;
  user_id: string | UserType;
  payment_type: string;
  amount: number;
  status: string;
  transaction_type: string;
  product_type: string;
  createdAt: string;
  updatedAt: string;
  transaction_code?: string;
}

interface PaymentDetailsBase {
  amount: number;
  product_type: string;
}

export interface PayProductByMoMo extends PaymentDetailsBase {}

export interface PayProductByStripe extends PaymentDetailsBase {
  name: string;
  image: string;
  description: string;
}

export interface PayProductByVnPay extends PaymentDetailsBase {}

export interface AddFundsType
  extends Omit<PaymentDetailsBase, "product_type"> {}
