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
      "https://lh3.googleusercontent.com/proxy/uj2kMAS9NRs4IcH30KwmyS_1ZBmvo9mNM6Wd7kZ0KpAG5CR9UAilXoKp28X8EcSImirPO2F5hfcCPSIbpvciNMuwX84006dIb7H19itUwVr0cU6jd7gJGEumYvD7Y5mRnSF7Wrn1BVNHHaz3ginKCc0T2b4pQ4mS2c41iaXO",
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

const list_doctor_tmp: DoctorType[] = [
  {
    id: 1,
    fullname: "Robyn Freeman",
    avatar_url:
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
    other_information:
      "Một bác sĩ hàng đầu trong ngành tâm lý học. Với nhiều năm kinh nghiệm điều trị và làm việc tại các bệnh viện trung ương. Luôn tận tâm và giúp đỡ người bệnh.",
    specialized_field: `. Rối loạn lo âu
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    specialty: "Tâm lý học lâm sàng",
    treatment_method: `. Liệu pháp nhận thức - hành vi (CBT)
. Liệu pháp tâm lý động học
. Liệu pháp gia đình`,
    experience: `. 10 năm kinh nghiệm làm việc trong lĩnh vực tâm lý
. 5 năm kinh nghiệm làm việc tại Bệnh viện Đại học Y dược TPHCM`,
    certificate: `. Giải thưởng "Bác sĩ tâm lý xuất sắc nhất năm 2022" do Hiệp hội Tâm lý học Việt Nam trao tặng
. Được bình chọn là bác sĩ tâm lý uy tín nhất trên trang web https://www.webmd.com/
. Có nhiều bài báo khoa học được đăng tải trên các tạp chí chuyên ngành uy tín trong nước và quốc tế.`,
    career: "Thạc sĩ tâm lý ",
  },
  {
    id: 1,
    fullname: "Robyn Freeman",
    avatar_url:
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
    other_information:
      "Một bác sĩ hàng đầu trong ngành tâm lý học. Với nhiều năm kinh nghiệm điều trị và làm việc tại các bệnh viện trung ương. Luôn tận tâm và giúp đỡ người bệnh.",
    specialized_field: `. Rối loạn lo âu
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    specialty: "Tâm lý học lâm sàng",
    treatment_method: `. Rối loạn lo âu
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    experience: `. 10 năm kinh nghiệm
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    certificate: `. 10 năm kinh nghiệm
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    career: "Thạc sĩ tâm lý ",
  },
  {
    id: 1,
    fullname: "Robyn Freeman",
    avatar_url:
      "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg",
    other_information:
      "Một bác sĩ hàng đầu trong ngành tâm lý học. Với nhiều năm kinh nghiệm điều trị và làm việc tại các bệnh viện trung ương. Luôn tận tâm và giúp đỡ người bệnh.",
    specialized_field: `. Rối loạn lo âu
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    specialty: "Tâm lý học lâm sàng",
    treatment_method: `. Rối loạn lo âu
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    experience: `. 10 năm kinh nghiệm
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    certificate: `. 10 năm kinh nghiệm
. Trầm cảm
. Stress
. Mất ngủ
. Rối loạn ám ảnh cưỡng chế
. Rối loạn nhân cách`,
    career: "Thạc sĩ tâm lý ",
  },
];

export const depressionResults = [
    {
      minScore: 0,
      maxScore: 5,
      result: "Không có triệu chứng",
      suggestion:
        "Bạn không có dấu hiệu của trầm cảm. Hãy duy trì lối sống lành mạnh và chăm sóc sức khỏe tâm lý.",
    },
    {
      minScore: 6,
      maxScore: 10,
      result: "Trầm cảm nhẹ",
      suggestion:
        "Bạn có một vài triệu chứng của trầm cảm. Nên theo dõi tâm trạng của mình và cân nhắc thay đổi lối sống lành mạnh hơn.",
    },
  {
    minScore: 11,
    maxScore: 15,
    result: "Trầm cảm nhẹ",
    suggestion:
      "Triệu chứng của bạn đang ở mức nhẹ. Hãy tìm sự hỗ trợ từ người thân và cân nhắc trò chuyện với chuyên gia tâm lý nếu cần.",
  },
  {
    minScore: 16,
    maxScore: 20,
    result: "Trầm cảm vừa",
    suggestion:
      "Bạn có các triệu chứng của trầm cảm mức vừa. Hãy tìm đến chuyên gia tâm lý để được tư vấn và hỗ trợ.",
  },
  {
    minScore: 21,
    maxScore: 25,
    result: "Trầm cảm vừa",
    suggestion:
      "Triệu chứng của bạn có thể ảnh hưởng đến cuộc sống hằng ngày. Cần hỗ trợ từ chuyên gia và thực hiện các thay đổi tích cực trong cuộc sống.",
  },
  {
    minScore: 26,
    maxScore: 30,
    result: "Trầm cảm nặng",
    suggestion:
      "Bạn đang gặp trầm cảm mức độ nặng. Hãy liên hệ với chuyên gia y tế để được tư vấn và điều trị ngay lập tức.",
  },
  {
    minScore: 31,
    maxScore: 35,
    result: "Trầm cảm nặng",
    suggestion:
      "Triệu chứng của bạn có thể ảnh hưởng nghiêm trọng đến sức khỏe. Nên cân nhắc các phương pháp điều trị chuyên sâu.",
  },
  {
    minScore: 36,
    maxScore: 40,
    result: "Trầm cảm nghiêm trọng",
    suggestion:
      "Bạn đang có triệu chứng trầm cảm nghiêm trọng. Cần điều trị khẩn cấp từ chuyên gia y tế để bảo vệ sức khỏe tâm lý của mình.",
  },
  {
    minScore: 41,
    maxScore: 50,
    result: "Trầm cảm nghiêm trọng",
    suggestion:
      "Tình trạng trầm cảm nghiêm trọng. Hãy tìm sự giúp đỡ từ các chuyên gia và người thân để hỗ trợ điều trị lâu dài.",
  },
  {
    minScore: 51,
    maxScore: 60,
    result: "Trầm cảm cực kỳ nghiêm trọng",
    suggestion:
      "Bạn đang gặp trầm cảm ở mức rất nghiêm trọng. Cần được điều trị và hỗ trợ ngay lập tức để ngăn ngừa những hậu quả nghiêm trọng.",
  },
  {
    minScore: 61,
    maxScore: 160,
    result: "Trầm cảm cực kỳ nghiêm trọng",
    suggestion:
      "Triệu chứng của bạn rất đáng lo ngại. Cần liên hệ với chuyên gia tâm lý và y tế ngay để được hỗ trợ điều trị.",
  },
];
