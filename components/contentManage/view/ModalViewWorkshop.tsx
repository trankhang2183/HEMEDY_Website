import { BlogType } from "@/types/blog.type";
import { WorkshopType } from "@/types/workshop.type";
import { Descriptions, Image, Modal } from "antd";
import React from "react";

interface Props {
  onClose: () => void;
  data: WorkshopType | null;
  open: boolean;
}

const ModalViewWorkshop: React.FC<Props> = (props) => {
  const { onClose, data, open } = props;

  if (!data) return null;

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
      }}
      footer={null}
      width="auto"
      style={{ top: "10px" }}
    >
      <Descriptions layout="vertical" className="mt-10">
        <Descriptions.Item label="Tiêu đề">{data.title}</Descriptions.Item>
        <Descriptions.Item label="Subtitle">{data.subtitle}</Descriptions.Item>
        <Descriptions.Item label="Kiểu blog">{data.type}</Descriptions.Item>
        <Descriptions.Item label="Ngày thêm vào">
          {new Date(data.createdAt!).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Ảnh đại diện">
          <Image src={data.representative_img} width={100} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="vertical">
        <Descriptions.Item label="Nội dung blog">
          <div
            className="w-fit"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
            }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ModalViewWorkshop;
