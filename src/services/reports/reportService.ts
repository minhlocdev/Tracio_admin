import axiosClient from "../axiosClient";
import { GetReportRequest, GetReportResponse } from "./models/getReport";
import { Report, PaginatedResponse } from "@models";

export const getReports = async (
  params: GetReportRequest
): Promise<PaginatedResponse<Report>> => {
  const response = await axiosClient.get<GetReportResponse>(
    "https://user.tracio.space/api/user-report",
    {
      params,
    }
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};
