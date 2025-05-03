import { Reward } from "./Reward";

export type Challenge = {
  challengeId: number;
  challengeThumbnail: string;
  title: string;
  description: string;
  challengeType: "Distance" | "TimeBased"; // add more if needed
  goalValue: number;
  unit: string;
  creatorId: number;
  creatorName: string;
  creatorAvatarUrl: string;
  totalParticipants: number;
  isSystem: boolean;
  isPublic: boolean;
  status: string;
  progress: number;
  challengeRank: number | null;
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  challengeRewardMappings: Reward[];
};
