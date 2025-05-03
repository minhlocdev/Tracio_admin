import { useQuery } from "@tanstack/react-query";
import { Challenge } from "@models";
import { getChallengeById } from "@services/challenges";

export const useGetChallengeById = (challengeId: number) => {
  return useQuery<Challenge, Error>({
    queryKey: ["challenge", challengeId],
    queryFn: () => getChallengeById(challengeId),
    placeholderData: (prev) => prev,
  });
};
