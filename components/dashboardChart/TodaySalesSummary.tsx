// components/TopServices.js

import { DataSaleType } from "@models/statistic";
import { AiOutlineBarChart, AiFillTag } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { PiExport } from "react-icons/pi";

interface Props {
  dataSale: DataSaleType;
}

const TodaySalesSummary: React.FC<Props> = (props) => {
  const { dataSale } = props;
  const summaryData = [
    {
      icon: <AiOutlineBarChart size={24} color="white" />,
      iconBackGroundColor: "#fb597e",
      value: `${dataSale.income.totalIncomeToday.toLocaleString()} VNĐ`,
      label: "Tổng doanh số",
      scale: dataSale.income.differencePercent,
      backGroundColor: "#ffe2e6",
    },
    {
      icon: <AiFillTag size={24} color="white" />,
      iconBackGroundColor: "#3cd856",
      value: dataSale.courses.totalCoursesToday.toString(),
      label: "Khoá học đã bán",
      scale: dataSale.courses.differencePercent,
      backGroundColor: "#dcfce7",
    },
    {
      icon: <BsFillPersonPlusFill size={24} color="white" />,
      iconBackGroundColor: "#bf84ff",
      value: dataSale.newUsers.totalNewUsersToday.toString(),
      label: "Khách hàng mới",
      scale: dataSale.newUsers.differencePercent,
      backGroundColor: "#f4e8fe",
    },
  ];

  const renderCard = (item: any, key: any) => {
    return (
      <div
        className="summary_card"
        style={{ backgroundColor: item.backGroundColor }}
        key={key}
      >
        <div
          className="summary_card_icon"
          style={{ backgroundColor: item.iconBackGroundColor }}
        >
          {item.icon}
        </div>
        <div className="summary_card_value">{item.value}</div>
        <div className="summary_card_label">{item.label}</div>
        <div className="summary_card_scale">{item.scale}% so với hôm qua</div>
      </div>
    );
  };

  return (
    <>
      <div className="summary_header">
        <p>Doanh số hôm nay</p>
        <button>
          {" "}
          <PiExport />
          Xuất
        </button>
      </div>
      <div className="summary_item_container">
        {summaryData.map((item, key) => renderCard(item, key))}
      </div>
    </>
  );
};

export default TodaySalesSummary;
