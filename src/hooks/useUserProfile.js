import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "../api/github";

import { queryKeys } from "../constants/queryKeys";

export const useUserProfile = (username) => {
  return useQuery({
    queryKey: queryKeys.users.profile(username),

    queryFn: () => getUserProfile(username),

    enabled: !!username,

    staleTime: 1000 * 60 * 5,
  });
};
