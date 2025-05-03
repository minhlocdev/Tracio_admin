import axiosClient from "../axiosClient";
import { GetChallengeRequest } from "./models/getChallengeModel";
import { Challenge, PaginatedResponse, ResponseModel } from "@models";

export const getChallenges = async (
  params: GetChallengeRequest
): Promise<PaginatedResponse<Challenge>> => {
  const response = await axiosClient.get<
    ResponseModel<PaginatedResponse<Challenge>>
  >("https://user.tracio.space/api/challenge", { params });

  if (!response.data.isSucceed) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};

export const getChallengeById = async (
  challengeId: number
): Promise<Challenge> => {
  const response = await axiosClient.get<ResponseModel<Challenge>>(
    `https://user.tracio.space/api/challenge/${challengeId}`
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};
