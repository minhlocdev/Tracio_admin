import { PaginatedResponse, Subscription } from "@models";
import {
  GetSubscriptionRequest,
  getSubscriptions,
} from "@services/subscriptions";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscriptions = (params: GetSubscriptionRequest) => {
  return useQuery<PaginatedResponse<Subscription>, Error>({
    queryKey: ["subscriptions", params],
    queryFn: () => getSubscriptions(params),
    placeholderData: (prev) => prev,
  });
};
