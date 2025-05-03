import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategory } from "../../services/categories/categoryService";
import { Category } from "../../constants/models/Category";
export const usePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryName: string) => postCategory(categoryName),

    onSuccess: (newCategory: Category) => {
      queryClient.setQueryData<Category[]>(["categories"], (old) =>
        old ? [newCategory, ...old] : [newCategory]
      );
    },

    onError: (err) => {
      console.error("Failed to create category:", err);
    },
  });
};
