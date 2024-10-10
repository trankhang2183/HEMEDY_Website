"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import HomeLayout from "@layout/HomeLayout";
import { useRouter } from "next/router";
import { depressionResults } from "@utils/constants";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const ResultTestPage: React.FC = () => {
  const router = useRouter();

  const [scoreSurvey, setScoreSurvey] = useState<any>(null);
  const [resultSurvey, setResultSurvey] = useState<any>(null);

  const getDepressionResult = (score: number) => {
    const result = depressionResults.find(
      (range) => score >= range.minScore && score <= range.maxScore
    );
    return result
      ? { result: result.result, suggestion: result.suggestion }
      : null;
  };

  useEffect(() => {
    const scoreSurvey = localStorage.getItem("scoreSurvey");

    if (scoreSurvey) {
      setScoreSurvey(JSON.parse(scoreSurvey));

      const result = getDepressionResult(JSON.parse(scoreSurvey));

      setResultSurvey(result);
    }
  }, []);

  return (
    <HomeLayoutNoSSR
      content={
        <div className="test-page">
          <div className="header">
            <h1>
              Kết quả đánh giá của bạn đạt được{" "}
              <span className="score">{scoreSurvey} điểm</span>
            </h1>
          </div>

          <div className="main-result container">
            <div className="px-32 py-28">
              <h1 className="font-semibold text-2xl">Kết quả:</h1>
              <p className="font-light text-xl">{resultSurvey?.result}</p>
              <h1 className="font-semibold text-2xl mt-16">Đề xuất: </h1>
              <p className="font-light text-xl">{resultSurvey?.suggestion}</p>
            </div>
            <div className="w-full flex justify-center items-center pb-20">
              <div
                className="btn-again uppercase text-2xl font-bold"
                onClick={() => router.push("/test")}
              >
                ĐÁNH GIÁ LẦN NỮA
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ResultTestPage;
