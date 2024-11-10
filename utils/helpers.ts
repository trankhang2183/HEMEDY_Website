import moment from "moment";
import dayjs from "dayjs";
import { ProductType, ProductVietNameseType } from "./enum";
import { storage } from "./config-firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const areInArray = (arr: any, ...elements: any[]) => {
  for (let element of elements) {
    if (arr?.includes(element)) {
      return true;
    }
  }
  return false;
};

export const isExpiredTimeToken = (loginDate: string, exp: number): boolean => {
  const tokenExpiredTime = moment(loginDate).add(exp, "minute").toDate();
  const currentDate = moment().toDate();
  return tokenExpiredTime > currentDate;
};

export const isExpiredTimeTokenSecondHandle = (iat: number, exp: number) => {
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > exp) {
    return true;
  } else {
    return false;
  }
};

export const moneyStringToNumber = (str: string): number => {
  return Number(str.replace(/,/g, ""));
};

export const moneyNumberToString = (num: number): string => {
  return num?.toLocaleString("en-US");
};

export const displayValue = (value: string | null | undefined): string => {
  return value ? value : "(Chưa cập nhật)";
};

export const formatNumberWithCommas = (value: number) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const formatDate = (dateString: any) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

//regex
export const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const handleLowerCaseNonAccentVietnamese = (str: string) => {
  str = str.toLowerCase();

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const generateFallbackAvatar = (
  fullname: string | undefined
): string => {
  const fallbackColor = "#FF9966";

  const initials = handleLowerCaseNonAccentVietnamese(
    fullname?.charAt(0).toUpperCase() || ""
  );

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="${fallbackColor}" />
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="50">
        ${initials}
      </text>
    </svg>
  `;
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  return dataUrl;
};

export const getProductVietNameseType = (productType: ProductType): string => {
  switch (productType) {
    case ProductType.YogaLesson:
      return ProductVietNameseType.YogaLesson;
    case ProductType.MeditationLesson:
      return ProductVietNameseType.MeditationLesson;
    case ProductType.BothLesson:
      return ProductVietNameseType.BothLesson;
    case ProductType.BasicMedicalExamination:
      return ProductVietNameseType.BasicMedicalExamination;
    case ProductType.VipMedicalExamination:
      return ProductVietNameseType.VipMedicalExamination;
    default:
      return "Không xác định";
  }
};

export const getPaymentStatusVietNameseType = (paymentType: string): string => {
  switch (paymentType) {
    case "Success":
      return "Đã thanh toán";
    case "Failure":
      return "Thanh toán thất bại";
    default:
      return "Không xác định";
  }
};

export const getAccountStatusVietNamese = (status: boolean): string => {
  switch (status) {
    case true:
      return "Đã bị ban";
    case false:
      return "Đang hoạt động";
    default:
      return "Không xác định";
  }
};

export const getScheduledStatus = (status: string): string => {
  switch (status) {
    case "Pending":
      return "Đang chờ tới khám";
    case "Completed":
      return "Đã hoàn thành";
    case "Canceled":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};

export const handleUploadToFirebase = async (file: File, folder: string) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  await uploadTask;
  return await getDownloadURL(storageRef);
};

export const formatToTwoDecimalPlaces = (num: number | null | undefined) => {
  if (num == null || isNaN(num)) {
    return 0;
  }
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};
