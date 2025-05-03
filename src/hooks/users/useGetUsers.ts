import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/users/userService";
import { GetUserRequest } from "../../services/users/models/getUser";
import { PaginatedResponse } from "../../constants/models/PaginationModel";
import { User } from "../../constants/models/User";

export const useGetUsers = (params: GetUserRequest) => {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (prev) => prev,
  });
};
