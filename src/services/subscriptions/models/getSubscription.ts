import { PaginatedResponse, ResponseModel, Subscription } from "@models";

type SubscriptionPagination<T> = Partial<PaginatedResponse<T>> & {
  totalSubscription: number;
  subscriptions: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type GetSubscriptionRequest = {
  keyword?: string;
  isActive?: boolean;
  sortBy?: "created_at" | "is_active";
  isAscending?: boolean;
  pageNumber?: number;
  pageSize?: number;
};

export type GetSubscriptionResponse = ResponseModel<
  SubscriptionPagination<Subscription>
>;
