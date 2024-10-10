import React from "react";

const PaymentOption = ({
  src,
  alt,
  paymentMethod,
  selectedPaymentMethod,
  handlePaymentSelection,
}) => (
  <img
    src={src}
    alt={alt}
    onClick={() => handlePaymentSelection(paymentMethod)}
    style={{
      border:
        selectedPaymentMethod === paymentMethod
          ? "2px solid #004c4c"
          : "2px solid #f6f6f6",
      cursor: "pointer",
      objectFit: "contain",
      height: "64px",
      width: "64px",
    }}
    loading="lazy"
  />
);

export default PaymentOption;
