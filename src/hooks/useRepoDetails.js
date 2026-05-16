import { useQuery } from "@tanstack/react-query";

import { getRepositoryDetails } from "../api/github";
import { queryKeys } from "../constants/queryKeys";

export const useRepoDetails = (owner, repo) => {
  return useQuery({
    queryKey: queryKeys.repos.details(owner, repo),

    queryFn: () =>
      getRepositoryDetails({
        owner,
        repo,
      }),

    enabled: !!owner && !!repo,

    staleTime: 1000 * 60 * 5,
  });
};
