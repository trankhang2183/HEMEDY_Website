import { WorkshopType } from "@/types/workshop.type";
import React from "react";

interface Props {
  workshop: WorkshopType;
}

const ItemWorkshop: React.FC<Props> = (props) => {
  const { workshop } = props;

  return (
    <div className="workshop-item w-full">
      <div className="container-img">
        <img
          src={workshop.representative_img_link}
          alt={workshop.type}
          loading="lazy"
        />
      </div>
      <div className="content mt-4">
        <div className="btn-view-more">Xem thêm</div>
        <p className="font-semibold text-lg mt-4 mb-3">{workshop.title}</p>
        <p className="font-light text-base">{workshop.subtitle}</p>
      </div>
    </div>
  );
};

export default ItemWorkshop;
