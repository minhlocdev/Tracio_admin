import { PaginatedResponse } from "../../../constants/models/PaginationModel";
import { ResponseModel } from "../../../constants/models/ResponseModel";
import { User } from "../../../constants/models/User";

export type GetUserRequest = {
  pageNumber?: number;
  rowsPerPage?: number;
  filterField?: string;
  filterValue?: string;
  sortField?: string;
  sortDesc?: boolean;
};

export type GetUsersResponse = ResponseModel<PaginatedResponse<User>>;
