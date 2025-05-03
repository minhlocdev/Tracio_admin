import { lazy } from "react";

export const LoadableDashboard = lazy(() => import("../../pages/dashboard"));
export const LoadableCategory = lazy(() => import("../../pages/category"));
export const LoadableChallenge = lazy(() => import("../../pages/challenge"));
export const LoadableChallengeDetail = lazy(
  () => import("../../pages/challenge/ChallengeDetail")
);
export const LoadableShop = lazy(() => import("../../pages/shop"));
export const LoadableUser = lazy(() => import("../../pages/user"));
export const LoadableUserDetail = lazy(
  () => import("../../pages/user/UserDetail")
);
export const LoadableReport = lazy(() => import("../../pages/report"));
export const LoadableSubscription = lazy(
  () => import("../../pages/subscription")
);
