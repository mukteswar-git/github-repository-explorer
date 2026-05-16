import { useInfiniteQuery } from "@tanstack/react-query";

import { searchRepositories } from "../api/github";
import { queryKeys } from "../constants/queryKeys";

export const useSearchRepos = (query) => {
  return useInfiniteQuery({
    queryKey: queryKeys.repos.search(query),

    queryFn: ({ pageParam }) =>
      searchRepositories({
        pageParam,
        query,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;

      const hasMore = currentPage * 20 < lastPage.total_count;

      return hasMore ? currentPage + 1 : undefined;
    },

    enabled: query.trim().length > 0,

    staleTime: 1000 * 60 * 5,
  });
};
