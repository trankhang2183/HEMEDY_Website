import { SurveyType } from "@/types/survey.type";
import { Descriptions, Image, Modal } from "antd";
import React from "react";

interface Props {
  onClose: () => void;
  data: SurveyType | null;
  open: boolean;
}

const ModalViewSurvey: React.FC<Props> = (props) => {
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
      
    </Modal>
  );
};

export default ModalViewSurvey;
