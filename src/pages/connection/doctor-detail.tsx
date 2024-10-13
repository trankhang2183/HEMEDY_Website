import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { FaUserDoctor } from "react-icons/fa6";
import { UserType } from "@/types/user.type";
import Calendar from "react-calendar";
import { TIME_SLOT } from "@utils/constants";
import scheduled from "@services/scheduled";
import { useSession } from "next-auth/react";
import { formatDate } from "@utils/helpers";
import { Modal, Spin } from "antd";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { BodyCreateScheduledType } from "@/types/scheduled.type";
import { toast } from "react-toastify";
const { confirm } = Modal;

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DoctorDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: token } = useSession();

  const [doctorItem, setDoctorItem] = useState<UserType | null>(null);
  const [isScheduleMode, setIsScheduleMode] = useState(false);
  const [selectedDate, onChange] = useState<Value>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [freeSlots, setFreeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("selectedDoctor");
    if (storedDoctor) {
      setDoctorItem(JSON.parse(storedDoctor));
    }
  }, []);

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const getCurrentTimePlusTwoHours = () => {
    const currentDate = new Date();
    const datePlusTwoHours = new Date(currentDate);
    datePlusTwoHours.setHours(currentDate.getHours() + 2);
    return datePlusTwoHours;
  };

  useEffect(() => {
    const fetchFreeSlots = async () => {
      setIsLoading(true);
      if (selectedDate && id) {
        try {
          const slots_list_free = await scheduled.getAllSlotFreeOfDoctor(
            token?.user.access_token!,
            id as string,
            formatDate(selectedDate)
          );
          console.log("slots_list_free: ", slots_list_free);
          const currentTimePlusTwoHours = getCurrentTimePlusTwoHours();

          const availableSlots = TIME_SLOT.filter((item) => {
            const [startHour] = item.time
              .split(" - ")[0]
              .split("h")
              .map(Number);
            const slotStartTime = new Date(selectedDate as any);
            slotStartTime.setHours(startHour);

            return (
              slotStartTime > currentTimePlusTwoHours &&
              slots_list_free.includes(item.slot)
            );
          });

          setFreeSlots(availableSlots.map((slot) => slot.slot));
        } catch (error) {
          console.error("Error fetching free slots:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFreeSlots();
  }, [selectedDate, id]);

  const handleCreateScheduled = async () => {
    const data: BodyCreateScheduledType = {
      appointment_date: formatDate(selectedDate),
      doctor_id: id as string,
      slot: selectedSlot!,
    };

    try {
      setIsLoadingCreate(true);

      const responseCreateScheduled = await scheduled.createScheduled(
        token?.user.access_token!,
        data
      );

      if (responseCreateScheduled) {
        toast.success("Tạo lịch hẹn thành công!");
        router.push("/account");
      }
    } catch (err) {
      toast.error("Có lỗi khi tạo lịch khám!");
      console.error("Error fetching data: ", err);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const handleCheckLoginBeforeScheduled = () => {
    if (!token?.user.access_token) {
      toast.error("Vui lòng đăng nhập trước khi đặt lịch khám!");
    } else {
      setIsScheduleMode(true);
    }
  };

  return (
    <HomeLayoutNoSSR
      content={
        <div className="connection-page">
          <div className="banner">
            <div className="content-banner">
              <FaUserDoctor className="text-white w-9 h-9 relative -left-4" />

              <div className="text-center">
                <h1 className="text-white font-semibold text-5xl">
                  Đội ngũ của chúng tôi
                </h1>
                <p className="text-white mt-4">
                  “Những bác sĩ giỏi có nhiều kinh nghiệm”
                </p>
              </div>
            </div>
          </div>

          <div className="doctor-detail-info py-20">
            <div className="container flex justify-center flex-col items-center">
              <div className="w-full flex flex-row justify-between gap-16">
                <div className="left">
                  <div className="card-info">
                    <img
                      src={doctorItem?.avatar_url}
                      alt={doctorItem?.fullname}
                      loading="lazy"
                    />
                    <div className="intro-info text-center">
                      <p className="font-semibold text-2xl">
                        {doctorItem?.fullname}
                      </p>
                      <p className="font-medium text-xl mt-2">
                        {doctorItem?.career}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="right">
                  {isScheduleMode ? (
                    <div className="manage-schedule">
                      <h1 className="font-bold text-2xl">
                        Chọn ngày và thời gian khám
                      </h1>

                      <div className="mt-10 main-schedule flex flex-row justify-between gap-32">
                        <Calendar
                          onChange={onChange}
                          value={selectedDate}
                          className="border p-2 rounded"
                        />{" "}
                        <div className="check-info-schedule">
                          <div>
                            <h1 className="text-center text-lg">
                              Thời gian bắt đầu và kết thúc
                            </h1>

                            {isLoading ? (
                              <div
                                style={{ width: "325px", height: "280px" }}
                                className="flex items-center justify-center"
                              >
                                <Spin spinning={isLoading} />
                              </div>
                            ) : freeSlots.length === 0 ? (
                              <div
                                className="text-center mt-4 text-red-500"
                                style={{ width: "320px" }}
                              >
                                Không còn slot trống nào trong ngày hôm nay cả.
                              </div>
                            ) : (
                              <div className="list-slots grid grid-cols-2 mt-4 gap-6">
                                {TIME_SLOT.filter((item) =>
                                  freeSlots.includes(item.slot)
                                ).map((item) => (
                                  <div
                                    key={item.slot}
                                    id={item.slot}
                                    className={`item-slot text-center cursor-pointer ${
                                      selectedSlot === item.slot
                                        ? "selected-item-slot"
                                        : ""
                                    }`}
                                    onClick={() => handleSlotClick(item.slot)}
                                  >
                                    {item.time}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* <div className="mt-4">
                            <h1 className="text-center text-lg">
                              Chọn gói khám
                            </h1>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="font-bold text-xl">1. Chuyên môn</h1>
                      <ul className="ml-10">
                        <li className="font-bold text-lg">
                          Chuyên khoa:{" "}
                          <span className="font-medium">
                            {doctorItem?.specialty}
                          </span>
                        </li>
                        <li className="font-bold text-lg">
                          Lĩnh vực chuyên sâu:{" "}
                          <pre className="font-medium">
                            {doctorItem?.specialized_field}
                          </pre>
                        </li>
                        <li className="font-bold text-lg">
                          Phương pháp điều trị:{" "}
                          <pre className="font-medium">
                            {doctorItem?.treatment_method}
                          </pre>
                        </li>
                        <li className="font-bold text-lg">
                          Kinh nghiệm:
                          <pre className="font-medium">
                            {doctorItem?.experience}
                          </pre>
                        </li>
                      </ul>

                      <h1 className="font-bold text-xl">
                        2. Thành tích nổi bật
                      </h1>
                      <pre className="font-medium ml-4 experience-list">
                        {" "}
                        {doctorItem?.certificate}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

              {isScheduleMode ? (
                <div
                  className="btn-scheduled mt-20 text-xl"
                  onClick={async () => {
                    confirm({
                      cancelText: "Quay lại",
                      okText: "Xác nhận",
                      title: (
                        <div>
                          <h1>Vui lòng xác nhận lại thông tin</h1>
                          <p className="text-black">
                            Bạn có chắc muốn đặt lịch hẹn Bác sĩ{" "}
                            <strong>{doctorItem?.fullname}</strong> vào ngày{" "}
                            <strong>{formatDate(selectedDate)}</strong> lúc{" "}
                            <strong>
                              {
                                TIME_SLOT.find(
                                  (item) => item.slot === selectedSlot
                                )?.time
                              }
                            </strong>{" "}
                            hay không?
                          </p>
                        </div>
                      ),
                      async onOk() {
                        handleCreateScheduled();
                      },
                      onCancel() {},
                    });
                  }}
                >
                  Xác nhận đặt lịch
                </div>
              ) : (
                <div
                  className="btn-scheduled mt-20 text-xl"
                  onClick={() => handleCheckLoginBeforeScheduled()}
                >
                  Đặt lịch ngay
                </div>
              )}
            </div>
          </div>
          {isLoadingCreate && <SpinnerLoading />}
        </div>
      }
    />
  );
};

export default DoctorDetail;
