import { SurveyType } from "@/types/survey.type";
import apiLinks from "@utils/api-links";
import httpClient from "@utils/http-client";

const getAllSurveysList = async (): Promise<SurveyType[]> => {
  const response = await httpClient.get({
    url: `${apiLinks.survey.getAllSurveysList}`,
  });
  return response.data;
};

const createSurvey = async (
  token: string,
  model: SurveyType
): Promise<SurveyType> => {
  const response = await httpClient.post({
    url: `${apiLinks.survey.createSurvey}`,
    token: token,
    data: model,
  });
  return response.data;
};

const updateSurvey = async (
  token: string,
  model: SurveyType,
  surveyId: string
): Promise<SurveyType> => {
  const response = await httpClient.put({
    url: `${apiLinks.survey.updateSurvey}/${surveyId}`,
    token: token,
    data: model,
  });
  return response.data;
};

const deleteSurvey = async (token: string, surveyId: string): Promise<any> => {
  const response = await httpClient.delete({
    url: `${apiLinks.survey.deleteSurvey}/${surveyId}`,
    token: token,
  });
  return response.data;
};

const getSurveyById = async (surveyId: string): Promise<SurveyType> => {
  const response = await httpClient.get({
    url: `${apiLinks.survey.getSurveyById}/${surveyId}`,
  });
  return response.data;
};

const survey = {
  getAllSurveysList,
  getSurveyById,
  createSurvey,
  deleteSurvey,
  updateSurvey,
};

export default survey;
