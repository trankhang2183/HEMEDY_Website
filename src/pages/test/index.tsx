"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { message, Modal, Spin } from "antd";
import HomeLayout from "@layout/HomeLayout";
import { useRouter } from "next/navigation";
import { depressionResults } from "@utils/constants";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { toast } from "react-toastify";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const survey = [
  {
    section: {
      no: 1,
      content: "I. câu hỏi có / không (2 điểm / 0 điểm)",
      type: "true/false",
      questions: [
        {
          no: 1,
          content: "Việc gì cũng thấy khẩn cấp",
          answer: [
            {
              content: "Có",
              score: 10,
            },
            {
              content: "Không",
              score: 0,
            },
          ],
        },
        {
          no: 2,
          content: "Đồng tiền trở thành động lực duy nhất để bạn làm việc",
          answer: [
            {
              content: "Có",
              score: 10,
            },
            {
              content: "Không",
              score: 0,
            },
          ],
        },
        {
          no: 3,
          content: "Đồng tiền trở thành động lực duy nhất để bạn làm việc",
          answer: [
            {
              content: "Có",
              score: 10,
            },
            {
              content: "Không",
              score: 0,
            },
          ],
        },
        {
          no: 4,
          content: "Thích thưởng cho mình nhiều hơn bình thường",
          answer: [
            {
              content: "Có",
              score: 10,
            },
            {
              content: "Không",
              score: 0,
            },
          ],
        },
        {
          no: 5,
          content:
            "Liên tục lo lắng về tương lai nhưng lại giết thời gian ở hiện tại",
          answer: [
            {
              content: "Có",
              score: 10,
            },
            {
              content: "Không",
              score: 0,
            },
          ],
        },
      ],
    },
  },
  {
    section: {
      no: 2,
      content: "II. Câu hỏi về sự ĐỐI MẶT ",
      type: "multiple choice",
      questions: [
        {
          no: 1,
          content: "Tâm trạng tôi cứ lo âu nhạy cảm và khó chịu hơn trước?",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 2,
          content: "Tôi ghét tương lai và không có chút hi vọng gì về nó?",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 3,
          content: "Tôi bi quan và tự ti về ngoại hình hơn",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 4,
          content: "Tôi cảm thấy dễ mệt, thở dốc và mắc bệnh nhiều hơn",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 5,
          content: "Tôi có xu hướng ăn nhiều hoặc ít hơn bình thường",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 6,
          content: "Tôi ăn không còn ngon miệng như trước nữa",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 7,
          content: "Cảm xúc tôi cứ thất thường, vui rồi buồn đột ngột",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 8,
          content: "Phản ứng thái quá với mọi chuyện",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 9,
          content: "Đôi khi tôi “lên kế hoạch để tự hủy” hay làm đau bản thân",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 10,
          content: "Suy nghĩ trong đầu tôi nhiều hơn",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
        {
          no: 11,
          content: "Tôi thấy mình không xứng đáng, tội lỗi",
          answer: [
            {
              content: "Không với tôi",
              score: 0,
            },
            {
              content: "Đôi khi",
              score: 2,
            },
            {
              content: "Đa phần",
              score: 5,
            },
            {
              content: "Luôn luôn",
              score: 10,
            },
          ],
        },
      ],
    },
  },
];

const TestPage: React.FC = () => {
  const router = useRouter();

  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (
    sectionNo: number,
    questionNo: number,
    score: number
  ) => {
    const key = `${sectionNo}_${questionNo}`;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: score,
    }));
  };

  const calculateTotalScore = () => {
    const totalScore = Object.values(answers).reduce(
      (sum, current) => sum + current,
      0
    );
    return totalScore;
  };

  const checkSurveyCompletion = () => {
    for (const sectionItem of survey) {
      for (const question of sectionItem.section.questions) {
        const key = `${sectionItem.section.no}_${question.no}`;
        if (!(key in answers)) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();

    if (
      Object.keys(answers).length <
      survey.reduce(
        (total, section) => total + section.section.questions.length,
        0
      )
    ) {
      Modal.warning({
        title: "Cảnh báo",
        content: "Bạn cần trả lời hết tất cả các câu hỏi trước khi nộp.",
      });
      return;
    }

    setLoading(true);

    toast.warning("Hệ thống đang xử lý kết quả vui lòng chờ trong giây lát!")
    setTimeout(() => {
      localStorage.setItem("scoreSurvey", JSON.stringify(totalScore));
      router.push("/test/result-test");
    }, 3000);
  };

  return (
    <HomeLayoutNoSSR
      content={
        <div className="test-page">
          <div className="header">
            <h1>Bài kiểm tra dưới đây sẽ phân loại mức độ trầm cảm của bạn</h1>
          </div>
          <div className="main-content">
            <div className="container survey">
              {survey.map((sectionItem, sectionIndex) => (
                <div key={sectionIndex} className="section mt-6">
                  <h2 className="uppercase text-xl">
                    {sectionItem.section.content}
                  </h2>
                  {sectionItem.section.questions.map(
                    (questionItem, questionIndex) => (
                      <div key={questionIndex} className="question">
                        <p
                          className="ml-32 mt-4 mb-4"
                          style={{ letterSpacing: "1px" }}
                        >
                          {questionItem.no}. {questionItem.content}
                        </p>
                        <div className="ml-64 answers flex flex-row gap-10">
                          {questionItem.answer.map(
                            (answerItem, answerIndex) => (
                              <div key={answerIndex} className="custom-radio">
                                <label className="custom-radio">
                                  <input
                                    type="radio"
                                    name={`${sectionItem.section.no}_question_${questionItem.no}`}
                                    value={answerItem.score}
                                    onChange={() =>
                                      handleAnswerChange(
                                        sectionItem.section.no,
                                        questionItem.no,
                                        answerItem.score
                                      )
                                    }
                                  />
                                  <p
                                    style={{ letterSpacing: "1px" }}
                                    className="inline-block ml-3 cursor-pointer"
                                  >
                                    {answerItem.content}
                                  </p>
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}

              <div className="footer">
                <div className="btn-submit-survey" onClick={handleSubmit}>
                  Nộp bài khảo sát
                </div>
              </div>
            </div>
          </div>
          {loading && <SpinnerLoading />}
        </div>
      }
    />
  );
};

export default TestPage;
