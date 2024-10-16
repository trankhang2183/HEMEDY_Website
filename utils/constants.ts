import { ProductSession } from "@/types/session.type";
import { ProductType } from "./enum";
import { DoctorType } from "@/types/user.type";

export const ROLE_ADMIN = "Admin";
export const ROLE_DOCTOR = "Doctor";
export const ROLE_CUSTOMER = "Customer";

export const NAV_ITEMS_GENERAL = [
  {
    nameItem: "Trang chủ",
    path: "/",
  },
  {
    nameItem: "Bài kiểm tra",
    path: "/test",
  },
  {
    nameItem: "Kết nối chuyên gia",
    path: "/connection",
  },
  {
    nameItem: "Khoá học",
    path: "/session",
  },
  {
    nameItem: "Khu chữa lành",
    path: "/healing",
  },
];

export const LIST_SESSION: ProductSession[] = [
  {
    id: 1,
    product_name: "Gói cơ bản",
    description: "Phù hợp cho những ai cần hỗ trợ tâm lý cơ bản.",
    product_type: ProductType.BasicMedicalExamination,
    price: "400,000",
    number_lesson: "3 buổi",
    detail: ["3 buổi khám", "Tư vấn qua video", "Bảo mật thông tin"],
  },
  {
    id: 2,
    product_name: "Gói chuyên sâu",
    description: "Dành cho những ai cần hỗ trợ tâm lý chuyên sâu và liên tục.",
    product_type: ProductType.VipMedicalExamination,
    price: "1,000,000",
    number_lesson: "8 buổi",
    detail: [
      "8 buổi khám",
      "Tư vấn qua video",
      "Hỗ trợ khẩn cấp 24/7",
      "Bảo mật thông tin",
    ],
  },
];

export const LIST_PRODUCT_SESSION: ProductSession[] = [
  {
    id: 3,
    product_name: "Yoga",
    product_type: ProductType.YogaLesson,
    price: "199,000",
    detail: [
      "Truy cập vào tất cả các bài học",
      "Không giới hạn số lượng bài học",
      "Hỗ trợ ưu tiên",
    ],
    image:
      "https://www.ekhartyoga.com/media/image/articles/Laia_Bove_Mermaid-pose.jpg",
    description:
      "Khóa học Yoga giúp bạn duy trì sức khỏe, tăng cường độ dẻo dai và tinh thần sảng khoái.",
  },
  {
    id: 4,
    product_name: "Thiền",
    product_type: ProductType.MeditationLesson,
    price: "199,000",
    detail: [
      "Truy cập vào tất cả các bài học",
      "Không giới hạn số lượng bài học",
      "Hỗ trợ ưu tiên",
    ],
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/Images/nguyenkhanh/2018/04/05/16-17.2_chua-tram-cam-bang-cach-ngoi-thien-1.jpg",
    description:
      "Khóa học thiền giúp bạn thư giãn, giảm căng thẳng và cải thiện sức khỏe tinh thần.",
  },
  {
    id: 5,
    product_name: "Yoga và Thiền",
    product_type: ProductType.BothLesson,
    price: "359,000",
    detail: [
      "Truy cập vào tất cả các bài học",
      "Không giới hạn số lượng bài học",
      "Hỗ trợ 24/7",
    ],
    image:
      "https://bizweb.dktcdn.net/100/262/937/files/thuc-hanh-thien-vipassana-ket-hop-yoga.jpg?v=1676267248821",
    description:
      "Gói học kết hợp Yoga và Thiền, mang lại lợi ích toàn diện cho cơ thể và tinh thần.",
  },
];

type TimeSlot = {
  time: string;
  slot: string;
};

export const TIME_SLOT: TimeSlot[] = [
  { time: "8h - 9h", slot: "slot_1" },
  { time: "9h - 10h", slot: "slot_2" },
  { time: "10h - 11h", slot: "slot_3" },
  { time: "11h - 12h", slot: "slot_4" },
  { time: "12h30 - 13h30", slot: "slot_5" },
  { time: "13h30 - 14h30", slot: "slot_6" },
  { time: "14h30 - 15h30", slot: "slot_7" },
  { time: "15h30 - 16h30", slot: "slot_8" },
];

export const depressionResults = [
  {
    minScore: 0,
    maxScore: 14,
    result: "Tuyệt vời, bạn hoàn toàn bình thường khỏe mạnh ",
    suggestion:
      "Nếu bạn bị stress nhẹ, bạn nên cải thiện các nguyên nhân dẫn đến stress của bạn và điều chỉnh lối sống lành mạnh hơn. Bạn có thể sử dụng các thực phẩm giảm stress, nến thơm hay các loại nước uống giảm stress. Ngoài ra, bạn có thể duy trì lối sống khoa học để giúp cơ thể khỏe mạnh và tinh thần luôn ở trạng thái tốt nhất. Bạn cũng có thể áp dụng các giải pháp giúp giải tỏa stress.",
  },
  {
    minScore: 15,
    maxScore: 18,
    result: "Có vẻ bạn đang bị lo âu nhẹ.",
    suggestion:
      "Nếu bạn bị stress nhẹ, bạn nên cải thiện các nguyên nhân dẫn đến stress của bạn và điều chỉnh lối sống lành mạnh hơn. Bạn có thể sử dụng các thực phẩm giảm stress, nến thơm hay các loại nước uống giảm stress. Ngoài ra, bạn có thể duy trì lối sống khoa học để giúp cơ thể khỏe mạnh và tinh thần luôn ở trạng thái tốt nhất. Bạn cũng có thể áp dụng các giải pháp giúp giải tỏa stress.",
  },
  {
    minScore: 19,
    maxScore: 25,
    result: "Bạn stress ở mức độ trung bình.",
    suggestion:
      "Nếu bạn bị stress nhẹ, bạn nên cải thiện các nguyên nhân dẫn đến stress của bạn và điều chỉnh lối sống lành mạnh hơn. Bạn có thể sử dụng các thực phẩm giảm stress, nến thơm hay các loại nước uống giảm stress. Ngoài ra, bạn có thể duy trì lối sống khoa học để giúp cơ thể khỏe mạnh và tinh thần luôn ở trạng thái tốt nhất. Bạn cũng có thể áp dụng các giải pháp giúp giải tỏa stress.",
  },
  {
    minScore: 26,
    maxScore: 33,
    result: "Có khả năng bạn bị stress nặng.",
    suggestion:
      "Nếu bài kiểm tra trên cho thấy bạn đang bị stress nặng, bạn nên tìm kiếm sự giúp đỡ từ chuyên gia tâm lý. Lúc này, bạn sẽ gặp nhiều phiền toái do khó kiểm soát cảm xúc và không thể ngừng lo lắng về những áp lực trong cuộc sống. Khi có triệu chứng hãy liên hệ khám ngay với các bác sĩ hoặc chuyên gia tâm lý. Bệnh được điều trị càng sớm, các tác hại của bệnh càng được giảm thiểu. Tìm gặp một chuyên gia tâm lý sẽ giúp bạn giải tỏa stress và tránh các nguy cơ bị các rối loạn tâm thần.",
  },
  {
    minScore: 34,
    maxScore: 160,
    result: "Bị stress rất nặng và cần gặp bác sĩ trong thời gian sớm nhất.",
    suggestion:
      "Nếu bài kiểm tra trên cho thấy bạn đang bị stress nặng, bạn nên tìm kiếm sự giúp đỡ từ chuyên gia tâm lý. Lúc này, bạn sẽ gặp nhiều phiền toái do khó kiểm soát cảm xúc và không thể ngừng lo lắng về những áp lực trong cuộc sống. Khi có triệu chứng hãy liên hệ khám ngay với các bác sĩ hoặc chuyên gia tâm lý. Bệnh được điều trị càng sớm, các tác hại của bệnh càng được giảm thiểu. Tìm gặp một chuyên gia tâm lý sẽ giúp bạn giải tỏa stress và tránh các nguy cơ bị các rối loạn tâm thần.",
  },
];
