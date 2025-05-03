export type Report = {
  reportId: number;
  targetType:
    | "Account"
    | "Blog"
    | "Comment"
    | "Route"
    | "Shop"
    | "Group"
    | "Service";
  reporterId: number;
  reporterUserName: string | null;
  reporterUserAvatarUrl: string | null;
  targetId: number;
  targetUserId: number;
  targetUserName: string | null;
  targetUserAvatarUrl: string | null;
  status: "Pending" | "Reviewing" | "Resolved" | "Dismissed";
  severityLevel: "None" | "Minor" | "Moderate" | "Severe";
  title: string;
  description: string;
  evidenceUrl: string;
  createdAt: string;
  respondAt: string | null;
};
