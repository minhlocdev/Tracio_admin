import { Reward } from "./Reward";

export type User = {
  userId: number;
  userName: string;
  email: string;
  firebaseId: string;
  phoneNumber: string;
  profilePicture: string;
  bio: string;
  totalDistance: number;
  totalDuration: number;
  maxDayStreak: number;
  dayStreak: number;
  totalBlog: number;
  followers: number;
  followings: number;
  totalRoute: number;
  gender: string;
  birthDate: string;
  city: string;
  district: string;
  isActive: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  rewards: Reward[];
};
