"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Modal } from "antd";
import HomeLayout from "@layout/HomeLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import { LuNewspaper } from "react-icons/lu";
import { CiLink, CiMusicNote1 } from "react-icons/ci";
import {
  FaArrowRightLong,
  FaChevronLeft,
  FaLocationDot,
  FaUserDoctor,
} from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { MdDashboard, MdOutlineMailOutline } from "react-icons/md";
import { ImHammer2 } from "react-icons/im";
import { IoIosCall } from "react-icons/io";

import Aos from "aos";
import "aos/dist/aos.css";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <HomeLayoutNoSSR
      content={
        <>
          <section className="first-section">
            <div className="container flex justify-between flex-row items-center h-full">
              <div
                className="flex flex-col justify-between w-2/4"
                data-aos="fade-in"
              >
                <h1 className="mb-4">Thực hiện</h1>
                <h6 className="text-4xl mb-2">Kiểm tra Để đánh giá </h6>
                <h6 className="text-4xl mb-4">Tình trạng Lo Âu của bạn </h6>
                <p className="mb-8">
                  Thực hiện bài kiểm tra của chúng tôi và nhận kết quả đánh giá
                  phân loại mức độ Stress. Ngoài ra chúng tôi sẽ đưa cho bạn
                  những lời khuyên thậthữu ích cho tình trạng của bạn.
                </p>

                <div className="paper-label flex flex-row items-center gap-7 ">
                  <div className="icon flex justify-center items-center">
                    <LuNewspaper className="text-white " />
                  </div>

                  <div className="button-feedback">
                    <p className="font-semibold text-sm">Kiểm tra đánh giá</p>
                  </div>
                </div>

                <div className="comment px-4 py-4 w-fit mt-16">
                  <div className="flex flex-row gap-4">
                    <Image
                      src="/images/avatar_doc.png"
                      width={41}
                      height={41}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">Thomas daniel</p>
                      <p>Sr Dental</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium">
                      Top Quailty dental treatment done by field experts, Highly
                      Recommended for everyone
                    </p>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left">
                <Image
                  src="/images/home_img.png"
                  width={500}
                  height={500}
                  alt="home_img"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section className="second-section">
            <div className="img-banner">
              <div className="container flex items-center justify-between h-full">
                <div className="left ">
                  <div className="line mb-3" data-aos="fade-right"></div>

                  <p className="text-white text-2xl mb-3" data-aos="fade-down">
                    Kết Nối
                  </p>
                  <p
                    className="text-white text-6xl font-bold mb-6"
                    data-aos="fade-down"
                  >
                    Chuyên Gia
                  </p>
                  <p
                    className="text-white text-lg font-light mb-5"
                    data-aos="fade-down"
                  >
                    Kết nối với những chuyên gia, chia sẻ với họ và <br></br>{" "}
                    nghe những tư vấn đầy đủ, hữu ích dành cho bạn.
                  </p>

                  <div
                    className="paper-label flex flex-row items-center gap-5 "
                    data-aos="fade-down"
                  >
                    <div className="icon flex justify-center items-center">
                      <CiLink className="text-white text-2xl" />
                    </div>

                    <div className="button-connect" onClick={() => router.push("/connection")}>
                      <p className="text-sm text-white">Kết nối ngay</p>
                    </div>
                  </div>
                </div>

                <div className="right ">
                  <div className="flex flex-row gap-5">
                    <div
                      className="img-doctor img-doctor-1 relative"
                      data-aos="fade-left"
                    >
                      <div className="introduction absolute">
                        <p className="text-white text-lg font-light">
                          Bác sĩ tâm lý
                        </p>
                        <p className="text-white font-bold text-xl">
                          Jim Carry
                        </p>
                      </div>
                    </div>

                    <div
                      className="img-doctor img-doctor-2 relative"
                      data-aos="fade-left"
                    >
                      <div className="introduction absolute">
                        <p className="text-white text-lg font-light">
                          Bác sĩ tâm lý
                        </p>
                        <p className="text-white font-bold text-xl">
                          Jacob Jones
                        </p>
                      </div>
                    </div>

                    <div
                      className="img-doctor img-doctor-3 relative"
                      data-aos="fade-left"
                    >
                      <div className="introduction absolute">
                        <p className="text-white text-lg font-light">
                          Bác sĩ tâm lý
                        </p>
                        <p className="text-white font-bold text-xl">
                          Wade Warren
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 mt-4"
                    data-aos="fade-in"
                  >
                    <div className="button-left">
                      <FaChevronLeft className="text-white" />
                    </div>

                    <div className="button-right">
                      <FaChevronRight className="text-white" />
                    </div>
                    <div></div>

                    <div className="line-process"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="third-section flex flex-col items-center text-center">
            <h1 className="text-6xl mb-5" data-aos="fade-up">
              Khoá Học Cho Bạn
            </h1>
            <p className="text-lg font-medium mb-7" data-aos="fade-up">
              Chúng tôi cung cấp cho bạn những khóa học giúp ích cho việc chữa
              lành tinh thần, <br></br>cải thiện tình trạng stress, lo âu và mất
              bình tĩnh của bạn qua những hóa học Yoga, thiền định.
            </p>
            <div className="flex flex-row gap-4 mb-10">
              <div
                className="btn btn-login font-semibold"
                data-aos="fade-up-right"
              >
                Đăng ký ngay
              </div>
              <div
                className="btn btn-more font-semibold"
                data-aos="fade-up-left"
              >
                Tìm hiểu thêm
              </div>
            </div>

            <div className="flex flex-row gap-6" data-aos="flip-up">
              <div>
                <Image
                  src="/images/group_avatar.png"
                  width={178}
                  height={56}
                  alt="home_img"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-4">
                  <FaStar className="star-color" />
                  <FaStar className="star-color" />
                  <FaStar className="star-color" />
                  <FaStar className="star-color" />
                  <FaStar className="star-color" />
                </div>
                <p
                  className="font-light text-base mt-2"
                  style={{ color: "#959393" }}
                >
                  Tin tưởng bởi +500 người
                </p>
              </div>
            </div>

            <div className="session mt-16 flex flex-row">
              <div style={{ width: "617px" }} data-aos="flip-left">
                <div className="relative">
                  <Image
                    src="/images/yoga.png"
                    width={585}
                    height={621}
                    alt="home_img"
                    loading="lazy"
                  />
                  <div className="arrow arrow-yoga">
                    <Image
                      src="/images/Vector.png"
                      width={22}
                      height={42}
                      alt="home_img"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="text-left ml-4">
                  <p className="name font-bold text-3xl mt-8 mb-5">Yoga</p>
                  <p
                    style={{ width: "90%" }}
                    className="description font-medium text-xl mb-7"
                  >
                    Xây dựng sức mạnh, nhận thức và sự hài hòa trong cả tinh
                    thần và thể chất.
                  </p>

                  <div className="btn btn-yoga font-semibold">Đăng ký ngay</div>
                </div>
              </div>

              <div style={{ width: "617px" }} data-aos="flip-right">
                <div className="relative">
                  <Image
                    src="/images/meditation.png"
                    width={585}
                    height={621}
                    alt="home_img"
                    loading="lazy"
                  />
                  <div className="arrow arrow-meditation">
                    <Image
                      src="/images/Vector.png"
                      width={22}
                      height={42}
                      alt="home_img"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="text-left ml-4">
                  <p className="name font-bold text-3xl mt-8 mb-5">
                    Thiền định
                  </p>
                  <p
                    style={{ width: "90%" }}
                    className="description font-medium text-xl mb-7"
                  >
                    Giảm căng thẳng, cải thiện tập trung và trí nhớ, cũng như
                    kiểm soát cảm xúc và chứng trầm cảm.
                  </p>

                  <div className="btn btn-meditation font-semibold">
                    Đăng ký ngay
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="fourth-section mt-28">
            <div className="text-center mb-7">
              <h1 className="text-6xl mb-9" data-aos="zoom-in">
                Khu chữa lành
              </h1>
              <p className="text-lg font-medium" data-aos="zoom-in">
                Nơi bạn tìm thấy những sự bình yên, nhẹ nhàng, bình tĩnh để suy
                ngẫm mọi thứ. Cũng tại đây, <br></br>tinh thần bạn sẽ thoải mái
                và thư giản. Hãy đến đây và cho tinh thần của bạn được nghĩ ngơi
              </p>
            </div>

            <div className="img-banner mt-16">
              <div className="container content flex flex-row justify-between items-center pt-14">
                <div className="left" data-aos="zoom-in-down">
                  <div className="relative">
                    <Image
                      src="/images/music-left.png"
                      width={456.54}
                      height={363.73}
                      alt="avatar_doc"
                      className="absolute z-10"
                      loading="lazy"
                    />

                    <div className="flex flex-col items-center -left-6 bottom-28 justify-center gap-5 list-option absolute z-20">
                      <Image
                        src="/images/music.png"
                        width={22.46}
                        height={21.09}
                        alt="avatar_doc"
                        loading="lazy"
                      />
                      <Image
                        src="/images/music-1.png"
                        width={19.71}
                        height={20}
                        alt="avatar_doc"
                        loading="lazy"
                      />
                      <Image
                        src="/images/smile.png"
                        width={19.71}
                        height={20}
                        alt="avatar_doc"
                        loading="lazy"
                      />
                      <Image
                        src="/images/sportify.png"
                        width={19.71}
                        height={20}
                        alt="avatar_doc"
                        loading="lazy"
                      />
                    </div>
                    <div className="background-linear"></div>
                    <div className="start-button absolute z-20 right-5 top-7">
                      <div className="triangle-right"></div>
                    </div>
                  </div>
                </div>

                <div className="right mr-20">
                  <p className="font-bold text-5xl" data-aos="zoom-in-left">
                    Âm Nhạc Nhẹ Nhàng <br></br>Xoa Dịu Tinh Thần
                  </p>

                  <p
                    className="font-normal text-lg mt-10 mb-10"
                    data-aos="zoom-in-left"
                  >
                    Tận hưởng những giây phút bình yên, thả lỏng <br></br>tinh
                    thần và với những giai điệu nhẹ nhàng đầy sâu lắng.
                  </p>

                  <div
                    className="flex flex-row gap-4 items-center"
                    data-aos="zoom-in-up"
                  >
                    <div className="btn text-lg">Tham gia ngay</div>
                    <div className="start-button">
                      <div className="triangle-right"></div>
                    </div>

                    <p>Tận hưởng nhé !</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container flex flex-row justify-between note pt-8 gap-8">
              <div></div>
              <div className="flex flex-row gap-10" style={{ width: "615px" }}>
                <div
                  className="flex flex-row gap-3 items-center"
                  data-aos="zoom-in-up"
                >
                  <div className="btn-music">
                    <PiMusicNotesPlusBold className="icon-add font-bold text-2xl" />
                  </div>
                  <p className="text-sm font-medium">Nghe nhạc theo sở thích</p>
                </div>

                <div
                  className="flex flex-row gap-3 items-center"
                  data-aos="zoom-in-up"
                >
                  <div className="btn-music">
                    <CiMusicNote1 className="icon-music font-bold text-2xl" />
                  </div>
                  <p className="text-sm font-medium">
                    Cập nhật các bài nhạc hiện có
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="fifth-section mt-28 text-center relative mb-16">
            <div className="flex justify-center flex-col items-center">
              <div className="circle-background">
                <h1 className="text-5xl mb-5" data-aos="flip-down">
                  Podcast Với Những Câu Chuyện
                  <br></br>Và Sự Chia Sẽ Rất Gần Gủi
                </h1>
                <p className="text-lg font-medium mb-44" data-aos="flip-down">
                  Những lời tâm sự, chia sẻ thật lòng của những người <br></br>
                  đã vượt qua mọi thứ, biết đâu bạn sẽ thấy chính mình trong câu
                  chuyện.
                </p>

                <div className="author-list flex flex-row justify-between">
                  <div
                    className="author_1 relative z-50"
                    data-aos="zoom-in-right"
                  >
                    <Image
                      src="/images/author_1.png"
                      width={300}
                      height={300}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="author_2 relative z-50"
                    data-aos="zoom-out-up"
                  >
                    <Image
                      src="/images/author_2.png"
                      width={280}
                      height={280}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="author_3 relative z-50"
                    data-aos="zoom-in-left"
                  >
                    <Image
                      src="/images/author_3.png"
                      width={300}
                      height={300}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <img
                src="/images/Line.png"
                style={{ width: "99vw", height: "100px" }}
                className="absolute z-20 line-break "
                loading="lazy"
              />

              <div
                className="btn-view flex justify-center items-center absolute"
                data-aos="zoom-out-down"
              >
                Xem ngay
              </div>
            </div>
          </section>

          <section className="container sixth-section ">
            <div className="mb-7 flex justify-center items-center relative">
              <div className=" flex justify-center gap-3">
                <h1 className="text-6xl mb-9" data-aos="fade-right">
                  KHÁM PHÁ
                </h1>
                <p
                  className="text-lg font-medium sub-title italic"
                  data-aos="fade-left"
                >
                  các bài viết về
                  <br></br>chữa lành tinh thần
                </p>
              </div>

              <p className="absolute right-0 italic text-more">Xem thêm</p>
            </div>

            <div className="list-discovery flex flex-row gap-3 justify-center">
              <div
                className="first-item flex flex-col items-center"
                data-aos="fade-down-right"
              >
                <div className="item-img relative cursor-pointer">
                  <Image
                    src="/images/discovery_1.png"
                    width={396}
                    height={437}
                    alt="avatar_doc"
                    loading="lazy"
                  />
                  <div className="absolute top-12 right-14 cursor-pointer">
                    <Image
                      src="/images/arrow_next.png"
                      width={31}
                      height={31}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="item-content">
                  <div className="flex gap-2 items-center">
                    <div className="dot"></div>
                    <p className="font-bold">Du lịch</p>
                  </div>
                  <p className="font-bold text-lg">
                    Tận hưởng thiên nhiên giúp giải tỏa căng thẳng, tái tạo năng
                    lượng
                  </p>
                </div>
              </div>

              <div
                className="special-item cursor-pointer relative"
                data-aos="fade-down"
              >
                <Image
                  src="/images/discovery_2.png"
                  width={484.81}
                  height={535}
                  alt="avatar_doc"
                  loading="lazy"
                />
                <div className="absolute top-6 right-6 cursor-pointer">
                  <Image
                    src="/images/arrow_next.png"
                    width={41}
                    height={41}
                    alt="avatar_doc"
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                className="item flex flex-col items-center mt-5"
                data-aos="fade-down-left"
              >
                <div className="item-img relative cursor-pointer">
                  <Image
                    src="/images/discovery_3.png"
                    width={340}
                    height={437 - 56}
                    alt="avatar_doc"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6 cursor-pointer">
                    <Image
                      src="/images/arrow_next.png"
                      width={31}
                      height={31}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="item-content mt-9">
                  <div className="flex gap-2 items-center">
                    <div className="dot"></div>
                    <p className="font-bold">Tâm bệnh</p>
                  </div>
                  <p className="font-bold text-lg">
                    Thế giới của người trầm cảm đáng sợ như thế nào ?
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            className="container seventh-section pt-44 flex flex-row justify-center gap-6"
            data-aos="fade-right"
          >
            <div className="relative left">
              <Image
                src="/images/lambanh.png"
                width={455}
                height={740}
                alt="avatar_doc"
                loading="lazy"
              />
              <div className="absolute bottom-5 right-5 cursor-pointer">
                <Image
                  src="/images/arrow_next.png"
                  width={31}
                  height={31}
                  alt="avatar_doc"
                  loading="lazy"
                />
              </div>

              <div className="absolute bottom-5 left-5 btn-more text-sm">
                Xem thêm
              </div>
              <div className="note absolute top-5 right-5">
                <div className="mb-2 flex flex-row items-center gap-3">
                  <div className="dot"></div>{" "}
                  <p className="font-medium text-sm">Làm bánh</p>
                </div>
                <p className="font-medium text-base">
                  Địa điểm dành cho những <br></br>tín đồ yêu thích làm bánh.
                </p>
              </div>
            </div>

            <div className="right flex flex-col justify-between">
              <div className="pt-6">
                <div className=" flex gap-3">
                  <h1 className="text-6xl mb-9">WORKSHOP</h1>
                  <p className="text-lg font-normal sub-title italic">
                    Thú vị
                    <br></br>đầy thư giãn
                  </p>
                </div>
                <p className="font-medium">
                  Những buổi workshop dành riêng <br></br>cho các thành viên của
                  Hemedy.
                </p>
              </div>

              <div className="flex flex-row gap-3">
                <div className="relative first-item">
                  <Image
                    src="/images/totuong.png"
                    width={379}
                    height={336}
                    alt="avatar_doc"
                    loading="lazy"
                  />

                  <div className="absolute top-5 right-5 cursor-pointer">
                    <Image
                      src="/images/arrow_next.png"
                      width={31}
                      height={31}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute top-5 left-5 btn-action text-sm font-semibold">
                    Tô tượng
                  </div>
                  <div className="overlay absolute"></div>
                  <div className="absolute bottom-5 left-5 btn-more text-sm font-semibold">
                    Xem thêm
                  </div>
                </div>

                <div className="relative second-item">
                  <Image
                    src="/images/lamgom.png"
                    width={379}
                    height={336}
                    alt="avatar_doc"
                    loading="lazy"
                  />

                  <div className="absolute top-5 right-5 cursor-pointer">
                    <Image
                      src="/images/arrow_next.png"
                      width={31}
                      height={31}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute  top-5 left-5 btn-action text-sm font-semibold">
                    Làm gốm
                  </div>
                  <div className="overlay absolute "></div>
                  <div className="absolute bottom-5 left-5 btn-more text-sm font-semibold flex items-center gap-2">
                    Tất cả workshop <FaArrowRightLong />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="container eighth-section flex flex-row justify-between pt-32"
            data-aos="fade-left"
          >
            <div className="left flex flex-col justify-center">
              <h1 className="font-extrabold text-6xl mb-7">
                Nhận Xét <br></br>
                Từ Mọi Người
              </h1>
              <p className="mb-7">
                Chúng tôi luôn lắng nghe và không ngừng nâng cao <br></br> trải
                nghiệm người dùng.
              </p>
              <div className="list-advance">
                <div className="flex flex-row items-center gap-3">
                  <div className="icon flex justify-center items-center">
                    <MdDashboard className="text-xl" />
                  </div>
                  <p>Nâng cao giao diện, dịch vụ và khóa học.</p>
                </div>
                <div className="flex flex-row items-center gap-3 my-3">
                  <div className="icon flex justify-center items-center">
                    <FaUserDoctor className="text-xl" />
                  </div>
                  <p>Đội ngũ chuyên gia uy tín, chuyên môn cao.</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div className="icon flex justify-center items-center">
                    <ImHammer2 className="text-xl" />
                  </div>
                  <p>Thông tin bảo mật cao, minh bạch, rõ ràng. </p>
                </div>
              </div>

              <div className="flex flex-row gap-3 mt-12">
                <div className="btn feedback text-sm">Đánh giá</div>
                <div className="btn view-more-feedback text-sm font-medium">
                  Xem thêm đánh giá
                </div>
              </div>
            </div>

            <div className="right flex flex-col items-center gap-4">
              <div className="feedback-item feedback-1">
                <div className="header">
                  <Image
                    src="/images/feedback_1.png"
                    width={70}
                    height={70}
                    alt="avatar_doc"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">Alena Alex</p>
                    <div>
                      <FaStar className="star" />
                      <FaStar className="star" />
                      <FaStar className="star" />
                      <FaStar className="star" />
                      <FaStar className="star" />
                    </div>
                  </div>
                </div>

                <div className="content mt-4">
                  <p className="text-sm">
                    Đây là một trang web tuyệt vời với rất nhiều thông tin hữu
                    ích về sức khỏe tâm lý. Tôi đã học được rất nhiều điều từ
                    đây và nó đã giúp tôi rất nhiều trong việc cải thiện sức
                    khỏe tinh thần của mình.
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div className="feedback-item feedback-2">
                  <div className="header">
                    <Image
                      src="/images/feedback_2.png"
                      width={70}
                      height={70}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-xl">Thomas daniel</p>
                      <div>
                        <FaStar className="star" />
                        <FaStar className="star" />
                        <FaStar className="star" />
                        <FaStar className="star" />
                        <FaStar className="star" />
                      </div>
                    </div>
                  </div>
                  <div className="content mt-4">
                    <p className="text-sm">
                      Tôi rất thích các bài viết trên trang web này. Chúng được
                      viết một cách khoa học nhưng dễ hiểu, và tôi luôn tìm thấy
                      những lời khuyên hữu ích trong đó.
                    </p>
                  </div>
                </div>

                <div className="feedback-item feedback-3">
                  <div className="header">
                    <Image
                      src="/images/feedback_3.png"
                      width={70}
                      height={70}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-xl">Thomas daniel</p>
                      <div>
                        <FaStar className="star" />
                        <FaStar className="star" />
                        <FaStar className="star" />
                        <FaStar className="star" />
                        <FaStar className="star" />
                      </div>
                    </div>
                  </div>
                  <div className="content mt-4">
                    <p className="text-sm">
                      Tôi đánh giá cao sự uy tín của trang web này. Thông tin
                      trên đây được kiểm duyệt kỹ lưỡng và có nguồn gốc rõ ràng,
                      vì vậy tôi có thể tin tưởng vào những gì tôi thấy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="feedback-item feedback-4">
                <div className="header">
                  <Image
                    src="/images/feedback_4.png"
                    width={70}
                    height={70}
                    alt="avatar_doc"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">Thomas Edison</p>
                    <div>
                      <FaStar className="star" />
                      <FaStar className="star" />
                      <FaStar className="star" />
                      <FaStar className="star" />
                      <FaStar className="star" />
                    </div>
                  </div>
                </div>
                <div className="content mt-4">
                  <p className="text-sm">
                    Giao diện của trang web rất đẹp mắt và dễ sử dụng. Tôi có
                    thể dễ dàng tìm thấy thông tin mình cần mà không gặp bất kỳ
                    khó khăn nào.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="nineth-section pt-24 mt-28">
            <div className="container">
              <div className="header flex flex-row justify-between">
                <div className="w-72">
                  <h1 className="font-bold text-lg mb-3" data-aos="fade-right">
                    Kết quả của chúng tôi
                  </h1>
                  <p className="font-bold text-3xl" data-aos="fade-right">
                    Những con số của chúng tôi tự nói lên điều đó.
                  </p>
                </div>

                <div
                  className="content relative text-center"
                  data-aos="fade-down-left"
                >
                  <div className="absolute -top-10 left-14 group-icon">
                    <Image
                      src="/images/group_people.png"
                      width={56}
                      height={56}
                      alt="avatar_doc"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-lg">
                    Các thành viên của Hemedi có ít nhất một điểm chung: Nhận
                    thấy sự cải thiện đáng kể, không bất kể triệu chứng của họ
                    nghiêm trọng đến mức nào.
                  </p>
                </div>
              </div>

              <div></div>
            </div>

            <div className="container flex flex-row justify-end main-content pt-20">
              <div className="w-80"></div>
              <div className="flex flex-row gap-2">
                <div
                  className="first-content w-56 relative"
                  data-aos="fade-down-right"
                >
                  <p className="text-6xl font-bold">
                    75 <span className="text-4xl font-extrabold">%</span>
                  </p>
                  <p className="font-light mt-3">
                    của các thành viên của chúng tôi bắt đầu với vừa đến nặng
                    triệu chứng.
                  </p>
                  <div className="absolute circle -right-2 -top-5"></div>
                </div>

                <div className="break-line"></div>

                <div className="content w-52" data-aos="fade-down-right">
                  <p className="text-6xl font-bold">
                    50 <span className="text-4xl font-extrabold">%</span>
                  </p>
                  <p className="font-light mt-3">
                    của các thành viên của chúng tôi bắt đầu với ý tưởng tự tử.
                  </p>
                </div>

                <div className="break-line"></div>

                <div className="content w-56" data-aos="fade-down-right">
                  <p className="text-6xl font-bold">
                    86 <span className="text-4xl font-extrabold">%</span>
                  </p>
                  <p className="font-light mt-3">
                    các thành viên của chúng tôi cảm thấy tốt hơn đáng kể chỉ
                    trong vòng 12 tuần
                  </p>
                </div>

                <div className="break-line"></div>

                <div className="content w-56" data-aos="fade-down-right">
                  <p className="text-6xl font-bold">
                    71 <span className="text-4xl font-extrabold">%</span>
                  </p>
                  <p className="font-light mt-3">
                    thành viên của chúng tôi đạt được mức độ thuyên giảm trong
                    vòng 12 tuần
                  </p>
                </div>
              </div>
            </div>

            <div className="container " data-aos="zoom-in-down">
              <div className="form mt-20 flex flex-row">
                <div className="w-1/2 left">
                  <h1 className="font-bold text-3xl mb-4">
                    Liên hệ với hemedy
                  </h1>
                  <p className="font-normal text-base mb-9">
                    Hãy để lời nhắn nếu bạn cần điều gì hỏi chúng tôi...
                  </p>
                  <h1 className="font-bold text-lg mb-3">
                    Giờ làm việc tại Việt Nam
                  </h1>
                  <p className="font-normal text-base mb-6">
                    Thứ Hai - Thứ Sáu 8:00 sáng đến 5:00 chiều
                  </p>
                  <div className="flex flex-row gap-3 items-center">
                    <IoIosCall />
                    <p>84 123 456 789</p>
                  </div>
                  <div className="flex flex-row gap-3 items-center my-6">
                    <MdOutlineMailOutline />

                    <p>hemedy@gmail.com</p>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <FaLocationDot />

                    <p>28 Đường Lê Duẩn, Quận 1, TP HCM, Việt Nam</p>
                  </div>
                </div>

                <div className="w-1/2 right pl-24">
                  <div className="flex flex-row gap-6">
                    <div className="form-item">
                      <p className="label">họ tên</p>
                      <div className="input">
                        <p>Nguyen Van A</p>
                      </div>
                    </div>

                    <div className="form-item">
                      <p className="label">email</p>
                      <div className="input">
                        <p>nguyenvana@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="form-item mt-10">
                    <p className="label"> lời nhắn</p>
                    <div className="input" style={{ width: "510px" }}>
                      <p>Bạn cần gì ...</p>
                    </div>
                  </div>

                  <div className="send-button">Gửi đi</div>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
};

export default HomePage;
