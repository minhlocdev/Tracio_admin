import { ResponseModel } from "../constants/models/ResponseModel";
import axiosClient from "./axiosClient";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}
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
