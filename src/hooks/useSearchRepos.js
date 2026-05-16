import { useInfiniteQuery } from "@tanstack/react-query";

import { searchRepositories } from "../api/github";
import { queryKeys } from "../constants/queryKeys";

export const useSearchRepos = (query) => {
  return useInfiniteQuery({
    queryKey: queryKeys.repos.search(query),

    queryFn: ({ pageParam, signal }) =>
      searchRepositories({
        pageParam,
        query,
        signal
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;

      const MAX_RESULTS = 1000;

      const totalResults = Math.min(lastPage.total_count, MAX_RESULTS);

      const hasMore = currentPage * 20 < totalResults;

      return hasMore ? currentPage + 1 : undefined;
    },

    enabled: query.trim().length > 0,

    staleTime: 1000 * 60 * 5,
  });
};
