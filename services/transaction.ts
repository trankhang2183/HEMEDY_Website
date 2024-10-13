import {
  AddFundsType,
  PayProductByMoMo,
  PayProductByStripe,
  PayProductByVnPay,
  TransactionType,
} from "@/types/transaction.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllTransactionOfCustomer = async (
  token: string
): Promise<TransactionType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.transaction.getAllTransaction}`,
    token: token,
  });
  return response.data;
};

const getAllTransactionByAdmin = async (
  token: string
): Promise<TransactionType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.transaction.getAllTransactionByAdmin}`,
    token: token,
  });
  return response.data;
};

const payProductByMoMo = async (
  token: string,
  model: PayProductByMoMo
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.transaction.payProductByMoMo}`,
    token: token,
    data: model,
  });
  return response.data;
};

const addFundsByMoMo = async (
  token: string,
  model: AddFundsType
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.transaction.addFundsByMoMo}`,
    token: token,
    data: model,
  });
  return response.data;
};

const payProductByStripe = async (
  token: string,
  model: PayProductByStripe
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.transaction.payProductByStripe}`,
    token: token,
    data: model,
  });
  return response.data;
};

const addFundsByStripe = async (
  token: string,
  model: AddFundsType
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.transaction.addFundsByStripe}`,
    token: token,
    data: model,
  });
  return response.data;
};

const payProductByVnPay = async (
  token: string,
  model: PayProductByVnPay
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.transaction.payProductByVnPay}`,
    token: token,
    data: model,
  });
  return response.data;
};

const addFundsByVnPay = async (
  token: string,
  model: AddFundsType
): Promise<any> => {
  const response = await httpClient.post({
    url: `${apiLinks.transaction.addFundsByVnPay}`,
    token: token,
    data: model,
  });
  return response.data;
};

const transaction = {
  getAllTransactionOfCustomer,
  getAllTransactionByAdmin,
  payProductByMoMo,
  addFundsByMoMo,
  payProductByStripe,
  addFundsByStripe,
  payProductByVnPay,
  addFundsByVnPay,
};

export default transaction;
