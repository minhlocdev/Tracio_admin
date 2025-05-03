import { useQuery } from "@tanstack/react-query";
import { getReports, GetReportRequest } from "@services/reports";
import { Report, PaginatedResponse } from "@models";

export const useGetReports = (params: GetReportRequest) => {
  return useQuery<PaginatedResponse<Report>, Error>({
    queryKey: ["reports", params],
    queryFn: () => getReports(params),
    placeholderData: (prev) => prev,
  });
};
