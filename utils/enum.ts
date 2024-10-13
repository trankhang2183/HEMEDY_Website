//content type
export enum ContentTypeEnum {
  MULTIPART = "multipart/form-data",
  APPLICATION_JSON_PATCH = "application/json-patch+json",
}

export enum HealingPageType {
  Healing = "healing",
  Podcast = "podcast",
  Music = "music",
}

export enum ProductType {
  YogaLesson = "yoga_lesson",
  MeditationLesson = "meditation_lesson",
  BothLesson = "both_lesson",
  BasicMedicalExamination = "basic_medical_examination",
  VipMedicalExamination = "vip_medical_examination",
}

export enum ProductVietNameseType {
  YogaLesson = "Khóa học Yoga",
  MeditationLesson = "Khóa học Thiền định",
  BothLesson = "Khóa học Yoga + Thiền định",
  BasicMedicalExamination = "Tư vấn cơ bản",
  VipMedicalExamination = "Tư vấn chuyên sâu",
}

export enum TransactionTypeEnum {
  AddFunds = "AddFunds",
  Pay = "Pay",
}

export enum PaymentMethodEnum {
  MOMO = "MoMo",
  VNPAY = "vnPay",
  STRIPE = "stripe",
  WALLET = "wallet",
}