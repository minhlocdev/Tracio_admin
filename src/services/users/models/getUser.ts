import { ResponseModel, User, PaginatedResponse } from "@models";

export type GetUserRequest = {
  pageNumber?: number;
  rowsPerPage?: number;
  filterField?: string;
  filterValue?: string;
  sortField?: string;
  sortDesc?: boolean;
};

export type GetUsersResponse = ResponseModel<PaginatedResponse<User>>;
