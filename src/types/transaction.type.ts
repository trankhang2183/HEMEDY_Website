export interface TransactionType {
  _id: string;
  user_id: string;
  payment_type: string;
  amount: number;
  status: string;
  transaction_type: string;
  product_type: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayProductByMoMo {
  amount: number;
  product_type: string;
}

export interface PayProductByStripe {
  amount: number;
  product_type: string;
  name: string;
  image: string;
  description: string;
}

export interface PayProductByVnPay {
  amount: number;
  product_type: string;
}

export interface AddFundsType {
  amount: number;
}
