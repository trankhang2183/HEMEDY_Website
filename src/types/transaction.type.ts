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
  name: string;
}
export interface PayProductByStripe extends PaymentDetailsBase {
  image: string;
  description: string;
}

export interface PayProductByMoMo extends PaymentDetailsBase {}
export interface PayProductByVnPay extends PaymentDetailsBase {}
export interface PayProductByWallet extends PaymentDetailsBase {}

export interface PayScheduledType extends PaymentDetailsBase {
  doctor_id: string;
  appointment_date: string;
  slot: string;
  description: string;
  image?: string;
}
export interface AddFundsType
  extends Omit<PaymentDetailsBase, "product_type"> {}
