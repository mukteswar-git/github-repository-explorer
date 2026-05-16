import { useInfiniteQuery } from "@tanstack/react-query";

import { getStarredRepositories } from "../api/github";

import { queryKeys } from "../constants/queryKeys";

export const useStarredRepos = (username) => {
  return useInfiniteQuery({
    queryKey: queryKeys.users.starred(username),

    queryFn: ({ pageParam }) =>
      getStarredRepositories({
        username,
        pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.length + 1 : undefined;
    },

    enabled: !!username,

    staleTime: 1000 * 60 * 5,
  });
};
