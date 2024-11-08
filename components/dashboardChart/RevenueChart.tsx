// components/RevenueChart.js
import { Bar } from "react-chartjs-2";

interface Props {
  revenueCurrentWeek: number[];
}

const RevenueChart: React.FC<Props> = (props) => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Khoá học",
        data: [30, 50, 70, 90, 50, 40, 60],
        backgroundColor: "#0096fe",
        maxBarThickness: 15,
        borderRadius: 4,
      },
      {
        label: "Đặt lịch",
        data: [20, 40, 60, 80, 40, 30, 50],
        backgroundColor: "#00e097",
        maxBarThickness: 15,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Doanh thu trong tuần",
            color: "#333", // Title color
            align: "start",
            font: {
              size: 20,
              weight: "bold",
              family: "Arial",
            },
          },
          legend: {
            position: "bottom",
            labels: {
              color: "#444", // Legend text color
              font: {
                size: 12,
              },
              boxWidth: 20,
              usePointStyle: true,
            },
          },
        },
      }}
    />
  );
};

export default RevenueChart;
