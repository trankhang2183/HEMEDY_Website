"use client";

import GoalsChart from "@components/dashboardChart/GoalsChart";
import RevenueChart from "@components/dashboardChart/RevenueChart";
import TopServices from "@components/dashboardChart/TopServices";
import VisitorsChart from "@components/dashboardChart/VisitorsChart";
import VolumeServiceLevel from "@components/dashboardChart/VolumeServiceLevel";
import WorldMap from "@components/dashboardChart/WorldMap";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";
import SatisfactionChart from "@components/dashboardChart/SatisfactionChart ";
import { Chart as ChartJS, registerables } from "chart.js";
import TodaySalesSummary from "@components/dashboardChart/TodaySalesSummary";
ChartJS.register(...registerables);

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <ManagerLayoutNoSSR
      content={
        <div className="dashboard">
          {/* <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8"> */}
          <div className="today_sales_summary dashboard_boxshadow">
            <TodaySalesSummary />
          </div>
          <div className="visitors_Chart dashboard_boxshadow">
            <VisitorsChart />
          </div>

          <div className="revenue_chart dashboard_boxshadow">
            <RevenueChart />
          </div>
          <div className="satisfaction_chart dashboard_boxshadow">
            <SatisfactionChart />
          </div>
          <div className="goals_chart dashboard_boxshadow">
            <GoalsChart />
          </div>
          <div className="top_services dashboard_boxshadow">
            <TopServices />
          </div>
          <div className="world_map dashboard_boxshadow">
            <WorldMap />
          </div>
          <div className="volume_service_level dashboard_boxshadow">
            <VolumeServiceLevel />
          </div>

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
