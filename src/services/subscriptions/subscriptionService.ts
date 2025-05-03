import axiosClient from "../axiosClient";
import {
  GetSubscriptionRequest,
  GetSubscriptionResponse,
} from "./models/getSubscription";
import { PaginatedResponse, ResponseModel, Subscription } from "@models";
import { PostSubscriptionModel } from "./models/postSubscription";

export const getSubscriptions = async (
  params: GetSubscriptionRequest
): Promise<PaginatedResponse<Subscription>> => {
  const response = await axiosClient.get<GetSubscriptionResponse>(
    "https://user.tracio.space/api/subscriptions",
    {
      params,
    }
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message);
  }

  const result = response.data.result;

  // Normalize totalCount
  const paginatedResult: PaginatedResponse<Subscription> = {
    ...result,
    items: result.subscriptions,
    totalCount: result.totalSubscription,
  };

  return paginatedResult;
};

export const postSubscription = async (
  request: PostSubscriptionModel
): Promise<Subscription> => {
  const response = await axiosClient.post<ResponseModel<Subscription>>(
    "https://user.tracio.space/api/subscriptions",
    request
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message || "Failed to create subscription");
  }

  return response.data.result;
};

export const deleteSubscription = async (
  subscriptionPlanId: number
): Promise<void> => {
  await axiosClient.delete<ResponseModel<Subscription>>(
    `https://user.tracio.space/api/subscriptions/${subscriptionPlanId}`
  );
};
