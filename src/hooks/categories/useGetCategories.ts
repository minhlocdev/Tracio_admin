import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@services/categories";
import { Category } from "@models";

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
