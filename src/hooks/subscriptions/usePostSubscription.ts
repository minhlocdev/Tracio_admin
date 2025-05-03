import {
  postSubscription,
  PostSubscriptionModel,
} from "@services/subscriptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PostSubscriptionModel) => postSubscription(request),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },

    onError: (err) => {
      console.error("Failed to create subscription:", err);
    },
  });
};
