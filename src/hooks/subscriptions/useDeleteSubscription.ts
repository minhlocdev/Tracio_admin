import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { deleteSubscription } from "@services/subscriptions";

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      message.success("Subscription deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
    onError: (err) => {
      message.error(err.message || "Failed to delete category");
    },
  });
};
