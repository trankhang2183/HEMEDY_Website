export interface SurveyType {
  _id?: string;
  title: string;
  section_list_id?: SectionType[];
  section_list?: SectionType[];
  createdAt?: string;
}

export interface SectionType {
  _id?: string;
  no: number;
  content: string;
  type: string;
  question_list_id?: QuestionType[];
  question_list?: QuestionType[];
  createdAt?: string;
}

export interface QuestionType {
  _id?: string;
  no: number;
  content: string;
  answer_list_id?: AnswerType[];
  answer_list?: AnswerType[];
  createdAt?: string;
}

export interface AnswerType {
  _id?: string;
  content: string;
  score: number;
  createdAt?: string;
}
