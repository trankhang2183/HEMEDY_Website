import { WorkshopType } from "@/types/workshop.type";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  workshop: WorkshopType;
}

const ItemWorkshop: React.FC<Props> = (props) => {
  const { workshop } = props;
  const router = useRouter();

  const handleViewDetail = (sectionId) => {
    sessionStorage.setItem("scrollPosition", sectionId);
    router.push({
      pathname: "/healing/workshop-detail",
      query: { id: workshop._id },
    });
  };

  return (
    <div className="workshop-item w-full">
      <div className="container-img">
        <img
          src={workshop.representative_img}
          alt={workshop.type}
          loading="lazy"
        />
      </div>
      <div className="content mt-4">
        <div
          className="btn-view-more"
          onClick={() => handleViewDetail("workshop-view-detail")}
        >
          Xem thêm
        </div>
        <p className="font-semibold text-lg mt-4 mb-3">{workshop.title}</p>
        <p className="font-light text-base">{workshop.subtitle}</p>
      </div>
    </div>
  );
};

export default ItemWorkshop;
