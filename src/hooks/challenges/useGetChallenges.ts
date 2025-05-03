import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse, Challenge } from "@models";
import { getChallenges, GetChallengeRequest } from "@services/challenges";

export const useGetChallenges = (params: GetChallengeRequest) => {
  return useQuery<PaginatedResponse<Challenge>, Error>({
    queryKey: ["challenges", params],
    queryFn: () => getChallenges(params),
    placeholderData: (prev) => prev,
  });
};
