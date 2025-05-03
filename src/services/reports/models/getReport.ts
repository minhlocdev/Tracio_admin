import { PaginatedResponse } from "@models/PaginationModel";
import { Report } from "@models/Report";
import { ResponseModel } from "@models/ResponseModel";

export type GetReportRequest = {
  pageNumber?: number;
  rowsPerPage?: number;
  filterField?: string;
  filterValue?: string;
  sortField?: string;
  sortDesc?: boolean;
};

export type GetReportResponse = ResponseModel<PaginatedResponse<Report>>;
