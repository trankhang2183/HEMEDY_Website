import { ProductSession, VideoListSession } from "@/types/session.type";
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

export const VIDEO_LIST_SESSION: VideoListSession[] = [
  {
    description_name: "30 ngày với YOGA cơ bản dành cho người mới bắt đầu",
    product_name: "Yoga",
    product_type: ProductType.YogaLesson,
    total_duration: "19 tiếng 15 phút",
    list_video: [
      {
        link_video:
          "https://www.youtube.com/embed/Qz8s4-ul2Js?si=F8NUDQkAuwzBHWBD",
        title: "Ngày 1| CHUYỂN ĐỘNG CƠ BẢN ",
        duration: "51 phút 50 giây",
      },
      {
        link_video:
          "https://www.youtube.com/embed/bsaYicSIc84?si=YHclqTRI8RpGB-VA",
        title: "Ngày 2 | KẾT NỐI HƠI THỞ ",
        duration: "42 phút 25 giây",
      },
      {
        link_video:
          "https://www.youtube.com/embed/_JAJYkIPVzc?si=kuRQaD14DMx5v4NE",
        title: "Ngày 3 | KHỞI ĐỘNG MẠNH MẼ",
        duration: "38 phút 27 giây",
      },
      {
        link_video:
          "https://www.youtube.com/embed/1KpU1srbE3c?si=lt2GE8sUAsrCr_UI",
        title: "Ngày 4 | BÀI TẬP CHÀO MẶT TRỜI YOGA",
        duration: "49 phút 30 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=ubK5xWzl1bQ&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=5",
        title: "Ngày 5 | YOGA SĂN CHẮC TOÀN THÂN",
        duration: "39 phút 42 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=8vSJtBtL95E&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=6",
        title: "Ngày 6 | YOGA TRỊ LIỆU ĐAU MỎI CỔ VAI GÁY",
        duration: "32 phút 22 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=7DmHGaiIE1c&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=7",
        title: "Ngày 7 | YOGA CHO ĐÔI CHÂN CHẮC KHỎE",
        duration: "36 phút 19 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=LQfmq6lWa6Q&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=8",
        title: "Ngày 8 | CỘT SỐNG LINH HOẠT",
        duration: "33 phút 11 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=llqKJwFrYgA&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=9",
        title: "Ngày 9 | YOGA CHO BẮP TAY THON GỌN",
        duration: "31 phút 14 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=MjoMh7Uyo1Q&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=10",
        title: "Ngày 10 | YOGA THẢI ĐỘC CƠ THỂ",
        duration: "29 phút 49 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=lsY5MRGPGgM&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=11",
        title: "Ngày 11 | YOGA CHO BỤNG NHỎ EO THON",
        duration: "33 phút 52 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=R8vRNaqa8ng&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=12",
        title: "Ngày 12 | YOGA KÉO GIÃN ĐÔI CHÂN",
        duration: "32 phút 10 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=Pk35XuqB4AM&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=13",
        title: "NGÀY 13 | YOGA TỐT CHO HỆ TIM MẠCH",
        duration: "37 phút 52 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=qPyPAHB_A7s&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=14",
        title: "NGÀY 14 | YOGA GIẢM CĂNG THẲNG STRESS",
        duration: "41 phút 09 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=OaUnfZo4Ib4&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=15",
        title: "NGÀY 15 | YOGA THĂNG BẰNG CHÂN",
        duration: "35 phút 07 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=Jufj67KweNo&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=16",
        title: "NGÀY 16 | YOGA CĂNG GIÃN TOÀN THÂN",
        duration: "34 phút 55 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=YtfrotL9GEg&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=17",
        title: "Ngày 17 | YOGA TĂNG CƯỜNG SỨC BỀN",
        duration: "36 phút 39 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=4MtgtesFN-s&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=18",
        title: "NGÀY 18 | YOGA XOẠC NGANG MỞ KHỚP HÁNG",
        duration: "39 phút 13 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=1ipF9KXXklY&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=19",
        title: "NGÀY 19 | YOGA GIẢM MỠ TOÀN THÂN",
        duration: "46 phút 35 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=A_oF_IGinA4&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=20",
        title: "NGÀY 20 | YOGA LINH HOẠT VÀ NĂNG LƯỢNG",
        duration: "33 phút 43 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=Bi9pn1qtPpc&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=21",
        title: "NGÀY 21 | YOGA GIẢM MỠ LƯNG BỤNG",
        duration: "35 phút 42 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=AgafI_Nv3Nk&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=22",
        title: "NGÀY 22 | YOGA KÉO GIÃN TOÀN THÂN",
        duration: "46 phút 00 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=8uisSKWaJsI&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=23",
        title: "NGÀY 23 | YOGA CHO CƠ MÔNG ĐÙI ĐIÊU KHẮC VÒNG 3",
        duration: "38 phút 12 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=1_DutIxhfaY&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=24",
        title: "NGÀY 24 | YOGA PHỤC HỒI ĐAU LƯNG CỰC HIỆU QUẢ",
        duration: "39 phút 47 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=gItdLceQ1MU&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=25",
        title: "NGÀY 25 |YOGA CHO LƯNG CHẮC KHỎE TẠO RÃNH LƯNG",
        duration: "41 phút 00 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=bwmRJt1xbk4&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=26",
        title: "NGÀY 26 | YOGA MỞ KHỚP HÔNG",
        duration: "36 phút 23 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=thoXT5CYUzo&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=27",
        title: "NGÀY 27 | YOGA THĂNG BẰNG TAY",
        duration: "34 phút 19 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=BrYzUmmscMw&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=28",
        title: "NGÀY 28 | YOGA MỞ VAI VÀ LƯNG TRÊN",
        duration: "30 phút 35 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=7pZoR1Sy3Rw&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=29",
        title: "NGÀY 29 | YOGA TỐT CHO TRÍ NÃO",
        duration: "35 phút 35 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=bL1n7PIbMOg&list=PLHJP_ixQJqndlLEiogNpq0COykHTzEt7o&index=30",
        title: "NGÀY 30 | YOGA CHO GIẤC NGỦ NGON",
        duration: "1 tiếng 00 phút 01 giây",
      },
    ],
    created_at: "Ngày 10 tháng 10 năm 2024",
    language: "Việt Nam",
    total_video: "30",
    description: `Khóa học Yoga 30 ngày dành cho người mới bắt đầu là chương trình lý tưởng cho những ai muốn khám phá và bắt đầu hành trình yoga của mình. Được thiết kế đặc biệt dành cho người mới, khóa học này sẽ giúp bạn làm quen với các tư thế yoga cơ bản, tập thở, và kỹ thuật thư giãn. Trong suốt 30 ngày, bạn sẽ được hướng dẫn qua từng bài tập một cách nhẹ nhàng, với thời lượng từ 30 đến 60 phút mỗi ngày, giúp bạn dễ dàng duy trì thói quen luyện tập.

Khóa học không chỉ tập trung vào việc cải thiện sự linh hoạt và sức mạnh cơ bắp mà còn giúp bạn giảm căng thẳng, cải thiện giấc ngủ, và tăng cường sức khỏe tinh thần. Với sự hướng dẫn tận tình từ các huấn luyện viên có kinh nghiệm, bạn sẽ dần cảm nhận được sự kết nối giữa cơ thể và tâm trí, tạo nên một nền tảng vững chắc để phát triển hơn trong yoga.

Cho dù bạn chưa từng thử yoga trước đây hay đã có chút kinh nghiệm, khóa học này sẽ là bước đệm hoàn hảo để bạn bắt đầu một lối sống khỏe mạnh, thư thái và cân bằng hơn.`,
  },
  {
    description_name: "Khóa học Thiền cho người mới bắt đầu",
    product_name: "Thiền",
    product_type: ProductType.MeditationLesson,
    total_duration: "1 tiếng 5 phút",
    list_video: [
      {
        link_video:
          "https://www.youtube.com/embed/4F0wvRD-C_o?si=n8kpLid6mPZZ3PAx",
        title: "Bài 1 - Buông bỏ và nghỉ ngơi",
        duration: "12 phút 03 giây",
      },
      {
        link_video:
          "https://www.youtube.com/embed/KXY7WV6xUW8?si=obVW6zDIS5OU3_Jv",
        title: "Bài 2 - Trở về với hiện tại",
        duration: "12 phút 04 giây",
      },
      {
        link_video:
          "https://www.youtube.com/embed/gmitGWTXsw0?si=k8gOXsOCh59NodQy",
        title: "Bài 3 - Sự chú tâm",
        duration: "12 phút 08 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=5--BMxE70oI&list=PLNFJ4436BTfu4O8lbr0Kw7B1QS518fqJi&index=4",
        title: "Bài 4 - Để tâm trí trở về với cơ thể",
        duration: "12 phút 03 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=Wu1OV_bvCV0&list=PLNFJ4436BTfu4O8lbr0Kw7B1QS518fqJi&index=5",
        title: "Bài 5 - Nuôi dưỡng sự tập trung",
        duration: "12 phút 03 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=a7MOYpJt3qg&list=PLNFJ4436BTfu4O8lbr0Kw7B1QS518fqJi&index=6",
        title: "Bài 6 - Làm bạn với suy nghĩ",
        duration: "12 phút 03 giây",
      },
      {
        link_video:
          "https://www.youtube.com/watch?v=bPwo6RPUZAo&list=PLNFJ4436BTfu4O8lbr0Kw7B1QS518fqJi&index=7",
        title: "Bài 7 - Nuôi dưỡng thái độ tích cực",
        duration: "12 phút 02 giây",
      },
    ],
    created_at: "Ngày 10 tháng 10 năm 2024",
    language: "Việt Nam",
    total_video: "7",
    description: `Khóa học Thiền định 7 ngày dành cho người mới bắt đầu là chương trình hoàn hảo để bạn làm quen và phát triển thói quen thiền định, giúp cải thiện sức khỏe tinh thần và cân bằng cảm xúc. Khóa học được thiết kế với những bài tập thiền ngắn gọn, đơn giản, phù hợp cho người chưa có kinh nghiệm, với thời lượng từ 10 đến 20 phút mỗi ngày.

Trong suốt 30 ngày, bạn sẽ được học các kỹ thuật thiền cơ bản như thiền quan sát hơi thở, thiền chánh niệm và thiền thư giãn, giúp bạn hiểu rõ cách làm dịu tâm trí, giảm căng thẳng và lo âu. Khóa học cũng hướng dẫn bạn cách tạo ra không gian thiền lý tưởng và xây dựng thói quen thiền định hàng ngày.

Với sự hỗ trợ từ các huấn luyện viên giàu kinh nghiệm, bạn sẽ từng bước khám phá được sức mạnh của sự tĩnh lặng, sự hiện diện trong khoảnh khắc hiện tại và khả năng điều chỉnh cảm xúc. Đây không chỉ là khóa học về thiền, mà còn là hành trình dẫn bạn đến một cuộc sống an yên, bình thản và giàu năng lượng tích cực.

Khóa học phù hợp cho tất cả mọi người, đặc biệt là những ai muốn tìm cách cải thiện sức khỏe tâm trí, giảm stress và nâng cao chất lượng cuộc sống.`,
  },
  {
    description_name: "Khóa học chữa lành",
    product_name: "Yoga và Thiền",
    product_type: ProductType.BothLesson,
    total_duration: "20 tiếng 20 phút",
    list_video: [],
    created_at: "Ngày 10 tháng 10 năm 2024",
    language: "Việt Nam",
    total_video: "37",
    description: `Khóa học Yoga và Thiền định dành cho người mới bắt đầu là sự kết hợp hoàn hảo giữa yoga và thiền, mang đến một chương trình toàn diện giúp cải thiện cả thể chất lẫn tinh thần. Khóa học này đặc biệt phù hợp cho những ai muốn bắt đầu hành trình chăm sóc sức khỏe một cách toàn diện, với các bài tập nhẹ nhàng, dễ tiếp cận và thời gian luyện tập linh hoạt từ 20 đến 30 phút mỗi ngày.

Trong suốt 30 ngày, bạn sẽ được hướng dẫn qua các tư thế yoga cơ bản giúp tăng cường sức mạnh, sự linh hoạt và cải thiện vóc dáng. Đồng thời, khóa học cũng bao gồm các kỹ thuật thiền định đơn giản, giúp bạn thư giãn, cân bằng tâm trí và giảm căng thẳng. Sự kết hợp giữa yoga và thiền không chỉ giúp bạn rèn luyện cơ thể mà còn mang lại sự bình an và tĩnh lặng trong tâm hồn.

Với sự chỉ dẫn tận tình từ các huấn luyện viên chuyên nghiệp, bạn sẽ dần cảm nhận được sự kết nối giữa cơ thể và tâm trí, từ đó xây dựng lối sống khỏe mạnh và cân bằng hơn. Mỗi ngày là một trải nghiệm mới mẻ, giúp bạn tiến gần hơn đến sự tĩnh lặng bên trong và năng lượng tích cực.

Khóa học phù hợp cho mọi đối tượng, đặc biệt là những người muốn tìm kiếm sự cân bằng giữa cơ thể và tinh thần, giảm stress và nâng cao sức khỏe toàn diện. Đây là bước khởi đầu tuyệt vời để bạn bước vào thế giới yoga và thiền định một cách nhẹ nhàng và hiệu quả.`,
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
