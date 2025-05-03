import { Report, PaginatedResponse, ResponseModel } from "@models";

export type GetReportRequest = {
  pageNumber?: number;
  rowsPerPage?: number;
  filterField?: string;
  filterValue?: string;
  sortField?: string;
  sortDesc?: boolean;
};

export type GetReportResponse = ResponseModel<PaginatedResponse<Report>>;
