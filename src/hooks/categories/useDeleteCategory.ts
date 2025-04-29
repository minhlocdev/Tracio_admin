import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { deleteCategory } from "../../services/categoryService";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      message.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      message.error(err.message || "Failed to delete category");
    },
  });
};
