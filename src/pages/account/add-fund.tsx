import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import {
  displayValue,
  formatNumberWithCommas,
  moneyNumberToString,
  moneyStringToNumber,
} from "@utils/helpers";
import transaction from "@services/transaction";
import { AddFundsType, TransactionType } from "@/types/transaction.type";
import { message, Modal, Spin } from "antd";
import { useRouter } from "next/navigation";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { toast } from "react-toastify";
import { IoReturnUpBack } from "react-icons/io5";
import { useState } from "react";
import PaymentOption from "@components/modal/PaymentOption";
import { PaymentMethodEnum } from "@utils/enum";
const { confirm } = Modal;

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const list_price: number[] = [
  100000, 200000, 500000, 1000000, 2000000, 5000000,
];

const AddFundPage = () => {
  const router = useRouter();
  const { data: token } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [customPrice, setCustomPrice] = useState<string>("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleRedirectToPayment = async (paymentMethod: string) => {
    const amount = selectedPrice || moneyStringToNumber(customPrice);
    if (!amount || amount <= 0) {
      toast.error("Vui lòng chọn hoặc nhập số tiền trước!");
      return;
    }

    const dataBody: AddFundsType = {
      amount: amount,
    };

    try {
      setIsLoading(true);
      toast.success("Bạn sẽ được chuyển đến trang thanh toán trong chốc lát!");

      let responseCreateLink: any;

      switch (paymentMethod) {
        case PaymentMethodEnum.MOMO:
          responseCreateLink = await transaction.addFundsByMoMo(
            token?.user.access_token!,
            dataBody
          );
          break;
        case PaymentMethodEnum.VNPAY:
          responseCreateLink = await transaction.addFundsByVnPay(
            token?.user.access_token!,
            dataBody
          );
          break;
        case PaymentMethodEnum.STRIPE:
          responseCreateLink = await transaction.addFundsByStripe(
            token?.user.access_token!,
            dataBody
          );
          break;
        default:
          throw new Error("Unsupported payment method");
      }

      const redirectUrl = responseCreateLink.payUrl || responseCreateLink;
      window.location.href = redirectUrl;

    } catch (error) {
      toast.error(`Có lỗi khi tạo thanh toán ${paymentMethod.toLowerCase()}!`);
      console.error(`Error fetching data for ${paymentMethod}: `, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckPaymentClick = () => {
    if (!selectedPaymentMethod) {
      setPaymentError("Vui lòng chọn phương thức muốn thanh toán");
      return;
    } else {
      confirm({
        centered: true,
        cancelText: "Hủy",
        okText: "Xác nhận",
        title: "Bạn có chắc là muốn nạp tiền vào ví với số tiền này?",
        onOk: async () => {
          try {
            switch (selectedPaymentMethod) {
              case PaymentMethodEnum.MOMO:
                handleRedirectToPayment(PaymentMethodEnum.MOMO);
                break;

              case PaymentMethodEnum.VNPAY:
                handleRedirectToPayment(PaymentMethodEnum.VNPAY);
                break;

              case PaymentMethodEnum.STRIPE:
                handleRedirectToPayment(PaymentMethodEnum.STRIPE);
                break;

              default:
                console.log("Phương thức thanh toán không hợp lệ");
            }
          } catch (error) {
            console.error("Error create link payment:", error);
            message.error("Có lỗi khi tạo link thanh toán!");
          }
        },
      });
    }
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const numericValue = input.replace(/[^\d]/g, "");

    setCustomPrice(moneyNumberToString(Number(numericValue)));
    setSelectedPrice(null);
  };

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentMethod(method);
    setPaymentError(null);
  };

  return (
    <HomeLayoutNoSSR
      content={
        <>
          <div className="container">
            <button
              className="back-button-return flex items-center gap-3 justify-center"
              onClick={() => router.push("/account")}
            >
              <IoReturnUpBack />
              Quay lại
            </button>
          </div>
          <div className="container add-funds-section flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold text-white">
              Phương thức nạp tiền
            </h1>

            <div className="bg-white rounded-2xl px-10 my-5">
              <div className="flex justify-center gap-5 my-5">
                <PaymentOption
                  src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg"
                  alt="MoMo"
                  paymentMethod={PaymentMethodEnum.MOMO}
                  selectedPaymentMethod={selectedPaymentMethod}
                  handlePaymentSelection={handlePaymentSelection}
                />

                <PaymentOption
                  src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg"
                  alt="VNPay"
                  paymentMethod={PaymentMethodEnum.VNPAY}
                  selectedPaymentMethod={selectedPaymentMethod}
                  handlePaymentSelection={handlePaymentSelection}
                />

                <PaymentOption
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Visa"
                  paymentMethod={PaymentMethodEnum.STRIPE}
                  selectedPaymentMethod={selectedPaymentMethod}
                  handlePaymentSelection={handlePaymentSelection}
                />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-white">
              Chọn số tiền nạp
            </h1>
            <div className="list-option-price grid grid-cols-3 gap-4 mt-4">
              {list_price.map((price, index) => (
                <div
                  key={index}
                  className={`option-price ${
                    selectedPrice === price ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedPrice(price), setCustomPrice("");
                  }}
                >
                  {moneyNumberToString(price)} VNĐ
                </div>
              ))}
            </div>

            <div className="another-option flex flex-col w-full mt-4">
              <label className="text-white font-light mb-2">Số khác</label>
              <input
                type="text"
                placeholder="Nhập con số ở đây"
                value={customPrice}
                onChange={handleCustomPriceChange}
              />
            </div>
            {paymentError && (
              <div
                style={{ color: "red", marginTop: "25px", textAlign: "center" }}
              >
                {paymentError}
              </div>
            )}
            <div
              className="btn-confirm-add-fund mt-7"
              onClick={handleCheckPaymentClick}
            >
              Xác nhận nạp tiền
            </div>
            {isLoading && <SpinnerLoading />}
          </div>
        </>
      }
    />
  );
};

export default AddFundPage;
