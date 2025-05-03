import { User, PaginatedResponse, ResponseModel } from "@models";
import axiosClient from "../axiosClient";
import { GetUserRequest, GetUsersResponse } from "./models/getUser";
import { LoginRequest, LoginResponse } from "./models/login";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post<ResponseModel<LoginResponse>>(
    `https://user.tracio.space/api/auth/login`,
    data
  );

  const res = response.data;

  if (!res.isSucceed) {
    throw new Error(res.message);
  }

  return res.result;
};

export const getUsers = async (
  params: GetUserRequest
): Promise<PaginatedResponse<User>> => {
  const response = await axiosClient.get<GetUsersResponse>(
    "https://user.tracio.space/api/users",
    {
      params,
    }
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};

export const getUserDetail = async (userId: number): Promise<User> => {
  const response = await axiosClient.get<ResponseModel<User>>(
    `https://user.tracio.space/api/users/${userId}`
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};
