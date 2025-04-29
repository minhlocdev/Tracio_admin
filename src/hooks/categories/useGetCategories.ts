import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoryService";
import { Category } from "../../constants/models/Category";

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
