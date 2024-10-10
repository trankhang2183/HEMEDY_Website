import { AccountProfileType, DoctorType } from "@/types/user.type";
import { useRouter } from "next/router";
import React from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import { PiChatTextLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

interface Props {
  doctorItem: AccountProfileType;
}

const DoctorItem: React.FC<Props> = (props) => {
  const { doctorItem } = props;
  const router = useRouter();

  const handleViewDetail = () => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctorItem));
    
    router.push({
      pathname: "/connection/doctor-detail",
      query: { id: doctorItem._id }, 
    });
  };

  return (
    <div className="doctor-item" onClick={handleViewDetail}>
      <img src={doctorItem.avatar_url} />
      <div className="doctor-information px-8 py-10 bg-white">
        <p className="text-2xl font-bold">{doctorItem.fullname}</p>
        <p className=" text-xl font-semibold mt-2">{doctorItem.career}</p>
        <p className=" text-lg font-medium mt-8 other-information">
          {doctorItem.otherInformation}
        </p>
        <div className="action-options mt-20 flex justify-between items-center flex-row">
          <div className="list-icons flex flex-row gap-4 items-center">
            <GoDeviceCameraVideo className="icon-item w-9 h-9" />

            <PiChatTextLight className="icon-item w-9 h-9" />

            <SlCalender className="icon-item w-7 h-7" />
          </div>

          <div className="btn-detail text-lg ">Chi tiết</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorItem;
