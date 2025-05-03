import { useQuery } from "@tanstack/react-query";
import { User } from "../../constants/models/User";
import { getUserDetail } from "../../services/users/userService";

export const useGetUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => getUserDetail(id),
    enabled: !!id,
  });
};
