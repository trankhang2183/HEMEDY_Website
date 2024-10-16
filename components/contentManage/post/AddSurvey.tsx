"use client";

import { QuestionType, SectionType, SurveyType } from "@/types/survey.type";
import ScrollToTopButton from "@components/scroll/ScrollToTopButton";
import survey from "@services/survey";
import { toastError } from "@utils/global";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { toast } from "react-toastify";
const { confirm } = Modal;

interface Props {
  backToViewSurveyList: () => void;
  handleAddNewSurvey: (newSurvey: SurveyType) => void;
}

const AddSurvey: React.FC<Props> = (props) => {
  const { backToViewSurveyList, handleAddNewSurvey } = props;
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [form] = Form.useForm();

  const updateSectionNumbers = (updatedSections: SectionType[]) => {
    return updatedSections.map((section, index) => ({
      ...section,
      no: index + 1,
    }));
  };

  const updateQuestionNumbers = (questions: QuestionType[]) => {
    return questions.map((question, index) => ({
      ...question,
      no: index + 1,
    }));
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        no: sections.length + 1,
        content: "",
        type: "Multiple Choice",
        question_list: [],
      },
    ]);
  };

  const handleDeleteSection = (sectionIndex: number) => {
    const updatedSections = sections.filter(
      (_, index) => index !== sectionIndex
    );
    setSections(updateSectionNumbers(updatedSections));
  };

  const handleSectionTypeChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].type = value;

    if (value === "True/False") {
      updatedSections[index].question_list = updatedSections[
        index
      ].question_list!.map((q) => ({
        ...q,
        answer_list: [
          { content: "Có", score: 2 },
          { content: "Không", score: 0 },
        ],
      }));
    } else if (value === "Multiple Choice") {
      updatedSections[index].question_list = updatedSections[
        index
      ].question_list!.map((q) => ({
        ...q,
        answer_list: [
          { content: "Không với tôi", score: 0 },
          { content: "Đôi khi", score: 1 },
          { content: "Đa phần", score: 2 },
          { content: "Luôn luôn", score: 3 },
        ],
      }));
    }

    setSections(updatedSections);
  };

  const handleAddQuestion = (sectionIndex: number) => {
    const updatedSections = [...sections];
    const newQuestion: QuestionType = {
      no: updatedSections[sectionIndex].question_list!.length + 1,
      content: "",
      answer_list:
        updatedSections[sectionIndex].type === "True/False"
          ? [
              { content: "Có", score: 2 },
              { content: "Không", score: 0 },
            ]
          : [
              { content: "Không với tôi", score: 0 },
              { content: "Đôi khi", score: 1 },
              { content: "Đa phần", score: 2 },
              { content: "Luôn luôn", score: 3 },
            ],
    };
    updatedSections[sectionIndex].question_list!.push(newQuestion);
    setSections(updatedSections);
  };

  const handleDeleteQuestion = (
    sectionIndex: number,
    questionIndex: number
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].question_list! = updatedSections[
      sectionIndex
    ].question_list!.filter((_, index) => index !== questionIndex);
    updatedSections[sectionIndex].question_list! = updateQuestionNumbers(
      updatedSections[sectionIndex].question_list!
    );
    setSections(updatedSections);
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      const newSurvey: SurveyType = {
        title: values.title,
        section_list: sections,
      };

      const responseCreate = await survey.createSurvey(
        session?.user.access_token!,
        newSurvey
      );

      handleAddNewSurvey(responseCreate);
      toast.success("Bài test đã được tạo thành công!");
      form.resetFields();
      setSections([]);
    } catch (error) {
      toastError(error);
      console.error("Form validation error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div
          onClick={backToViewSurveyList}
          className="flex items-center gap-4 flex-row back-button"
          style={{ color: "#8B8484" }}
        >
          <IoReturnUpBack />
          Quay lại
        </div>

        <Button
          loading={isLoading}
          onClick={async () => {
            await form.validateFields();

            confirm({
              cancelText: "Quay lại",
              okText: "Xác nhận",
              title: "Bạn có chắc muốn đăng bài bài test này?",
              async onOk() {
                handleFormSubmit();
              },
              onCancel() {},
            });
          }}
          icon={<MdUpload />}
          className="flex items-center"
        >
          Xác nhận đăng bài test
        </Button>
      </div>

      <h1 className="text-center text-2xl uppercase">Tạo bài test mới</h1>

      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Survey Title"
          name="title"
          rules={[{ required: true, message: "Please enter the survey title" }]}
        >
          <Input placeholder="Enter survey title" />
        </Form.Item>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: 20 }}>
            <div className="flex flex-col" style={{ width: "100%" }}>
              <Form.Item label={`Section ${section.no} Content`}>
                <Input
                  value={section.content}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[sectionIndex].content = e.target.value;
                    setSections(updatedSections);
                  }}
                  placeholder={`Enter content for section ${section.no}`}
                />
              </Form.Item>

              <Form.Item label={`Section ${section.no} Type`}>
                <Select
                  value={section.type}
                  onChange={(value) =>
                    handleSectionTypeChange(sectionIndex, value)
                  }
                >
                  <Select.Option value="True/False">True/False</Select.Option>
                  <Select.Option value="Multiple Choice">
                    Multiple Choice
                  </Select.Option>
                </Select>
              </Form.Item>

              {section.question_list!.map((question, questionIndex) => (
                <div key={questionIndex} style={{ marginBottom: 10 }}>
                  <Form.Item label={`Question ${question.no}`}>
                    <Input
                      value={question.content}
                      onChange={(e) => {
                        const updatedSections = [...sections];
                        updatedSections[sectionIndex].question_list![
                          questionIndex
                        ].content = e.target.value;
                        setSections(updatedSections);
                      }}
                      placeholder={`Enter content for question ${question.no}`}
                    />
                  </Form.Item>

                  {question.answer_list!.map((answer, answerIndex) => (
                    <Form.Item
                      label={`Answer ${answerIndex + 1}`}
                      key={answerIndex}
                    >
                      <Input
                        value={answer.content}
                        onChange={(e) => {
                          const updatedSections = [...sections];
                          updatedSections[sectionIndex].question_list![
                            questionIndex
                          ].answer_list![answerIndex].content = e.target.value;
                          setSections(updatedSections);
                        }}
                        disabled={true}
                      />
                    </Form.Item>
                  ))}

                  <Button
                    type="link"
                    danger
                    onClick={() =>
                      handleDeleteQuestion(sectionIndex, questionIndex)
                    }
                  >
                    Delete Question
                  </Button>
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => handleAddQuestion(sectionIndex)}
              >
                Add Question
              </Button>

              <Button
                type="link"
                danger
                onClick={() => handleDeleteSection(sectionIndex)}
              >
                Delete Section
              </Button>
            </div>
          </div>
        ))}

        <Button type="dashed" onClick={handleAddSection}>
          Add Section
        </Button>
      </Form>
    </div>
  );
};

export default AddSurvey;
