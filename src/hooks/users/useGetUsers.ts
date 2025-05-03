import { useQuery } from "@tanstack/react-query";
import { GetUserRequest, getUsers } from "@services/users";
import { PaginatedResponse, User } from "@models";

export const useGetUsers = (params: GetUserRequest) => {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (prev) => prev,
  });
};
