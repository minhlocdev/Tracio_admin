import { useQuery } from "@tanstack/react-query";
import { User } from "@models";
import { getUserDetail } from "@services/users";

export const useGetUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => getUserDetail(id),
    enabled: !!id,
  });
};
