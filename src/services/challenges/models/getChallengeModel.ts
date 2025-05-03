export type GetChallengeRequest = {
  pageNumber?: number; // Default: 1
  rowsPerPage?: number; // Default: 10
  filterField?: string;
  filterValue?: string;
  sortField?: string;
  sortDesc?: boolean; // Default: false
  getMyChallenges?: boolean; // Default: false
};
