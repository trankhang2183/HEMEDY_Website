"use client";

import GoalsChart from "@components/dashboardChart/GoalsChart";
import RevenueChart from "@components/dashboardChart/RevenueChart";
import TopServices from "@components/dashboardChart/TopServices";
import VisitorsChart from "@components/dashboardChart/VisitorsChart";
import VolumeServiceLevel from "@components/dashboardChart/VolumeServiceLevel";
import WorldMap from "@components/dashboardChart/WorldMap";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import SatisfactionChart from "@components/dashboardChart/SatisfactionChart ";
import { Chart as ChartJS, registerables } from "chart.js";
import TodaySalesSummary from "@components/dashboardChart/TodaySalesSummary";
import statistics from "@services/statistics";
import { toast } from "react-toastify";
import { toastError } from "@utils/global";
import { Spin } from "antd";
import { DataSaleType, TopServicesType } from "@models/statistic";
ChartJS.register(...registerables);

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Dashboard = () => {
  const { data: token } = useSession();

  const [dataSale, setDataSale] = useState<DataSaleType | null>(null);
  const [revenueCurrentWeek, setRevenueCurrentWeek] = useState<number[]>([]);
  const [revenueMonthly, setRevenueMonthly] = useState<number[]>([]);
  const [topServices, setTopServices] = useState<TopServicesType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (token?.user.access_token) {
        try {
          setIsLoading(true);
          const dataSale = statistics.getDateSale(token.user.access_token);

          const revenueCurrentWeeks = statistics.getRevenueCurrentWeek(
            token.user.access_token
          );

          const revenueMonthlys = statistics.getRevenueMonthly(
            token.user.access_token
          );

          const topServicesDatas = statistics.getTopServices(
            token.user.access_token
          );

          const [
            dataSalesResult,
            revenueCurrentWeekResult,
            revenueMonthlyResult,
            topServicesResult,
          ] = await Promise.all([
            dataSale,
            revenueCurrentWeeks,
            revenueMonthlys,
            topServicesDatas,
          ]);

          setDataSale(dataSalesResult);
          setRevenueCurrentWeek(revenueCurrentWeekResult);
          setRevenueMonthly(revenueMonthlyResult);
          setTopServices(topServicesResult);
        } catch (error) {
          toast.error("Có lỗi xảy ra khi tải dữ liệu cá nhân!");
          toastError(error);
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [token?.user.access_token]);

  return (
    <ManagerLayoutNoSSR
      content={
        <div className="dashboard">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spin />
            </div>
          ) : (
            <>
              <div className="today_sales_summary dashboard_boxshadow">
                <TodaySalesSummary dataSale={dataSale!} />
              </div>
              <div className="visitors_Chart dashboard_boxshadow">
                <VisitorsChart />
              </div>

              <div className="revenue_chart dashboard_boxshadow">
                <RevenueChart revenueCurrentWeek={revenueCurrentWeek} />
              </div>
              <div className="satisfaction_chart dashboard_boxshadow">
                <SatisfactionChart />
              </div>
              <div className="goals_chart dashboard_boxshadow">
                <GoalsChart revenueMonthly={revenueMonthly} />
              </div>
              <div className="top_services dashboard_boxshadow">
                <TopServices topServices={topServices} />
              </div>
              <div className="world_map dashboard_boxshadow">
                <WorldMap />
              </div>
              <div className="volume_service_level dashboard_boxshadow">
                <VolumeServiceLevel />
              </div>
            </>
          )}

          {/* Row 2: Revenue, Satisfaction, Goals */}
          {/* Row 3: Top Services, World Map, Volume vs Service Level */}
          {/*<div className="row">
              <TopServices />
               <WorldMap />
              <VolumeServiceLevel />
            </div> */}
          {/* </div> */}
        </div>
      }
    />
  );
};

export default Dashboard;
