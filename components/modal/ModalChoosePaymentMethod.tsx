"use client";

import React, { useState } from "react";
import { Modal, Avatar, Button, message } from "antd";
const { confirm } = Modal;
import { PaymentMethodEnum, TransactionTypeEnum } from "@utils/enum";
import PaymentOption from "./PaymentOption";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  paymentPurpose: TransactionTypeEnum;
  handlePaymentByMoMo: () => void;
  handlePaymentByStripe: () => void;
  handlePaymentByVnPay: () => void;
  handlePaymentByWallet?: () => void;
}

const ModalChoosePaymentMethod: React.FC<Props> = (props) => {
  const {
    open,
    onClose,
    title,
    paymentPurpose,
    handlePaymentByMoMo,
    handlePaymentByStripe,
    handlePaymentByVnPay,
    handlePaymentByWallet,
  } = props;

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentMethod(method);
    setPaymentError(null);
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
        title: title,
        onOk: async () => {
          try {
            switch (selectedPaymentMethod) {
              case PaymentMethodEnum.MOMO:
                handlePaymentByMoMo();
                break;

              case PaymentMethodEnum.VNPAY:
                handlePaymentByVnPay();
                break;

              case PaymentMethodEnum.STRIPE:
                handlePaymentByStripe();
                break;

              case PaymentMethodEnum.WALLET:
                if (paymentPurpose === TransactionTypeEnum.Pay) {
                  // do something
                }
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

  return (
    <Modal
      centered
      width={"500px"}
      title={"Vui lòng chọn phương thức thanh toán"}
      open={open}
      onCancel={() => {
        onClose();
        setSelectedPaymentMethod(null);
      }}
      footer={[
        <Button
          className="btn-submit"
          key="cancel"
          type="text"
          onClick={() => {
            onClose();
          }}
        >
          Huỷ
        </Button>,

        <Button
          className="btn-submit btn-continue-with-new-info"
          key="submit"
          onClick={handleCheckPaymentClick}
        >
          Xác nhận
        </Button>,
      ]}
      maskClosable={false}
    >
      <div className="flex justify-center gap-5">
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

        {paymentPurpose === TransactionTypeEnum.Pay && (
          <PaymentOption
            src="https://static.vecteezy.com/system/resources/previews/035/692/634/non_2x/wallet-icon-design-template-simple-and-clean-vector.jpg"
            alt="Wallet"
            paymentMethod={PaymentMethodEnum.WALLET}
            selectedPaymentMethod={selectedPaymentMethod}
            handlePaymentSelection={handlePaymentSelection}
          />
        )}
      </div>
      {paymentError && (
        <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {paymentError}
        </div>
      )}
    </Modal>
  );
};

export default ModalChoosePaymentMethod;
