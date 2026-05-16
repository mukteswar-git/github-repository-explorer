import githubApi from "./axios";

export const searchRepositories = async ({ pageParam = 1, query, sort, signal }) => {
  const response = await githubApi.get("/search/repositories", {
    sort,
    
    signal,

    params: {
      q: query,
      sort,
      order: "desc",
      page: pageParam,
      per_page: 20,
    },
  });

  return response.data;
};

export const getRepositoryDetails = async ({ owner, repo }) => {
  const response = await githubApi.get(`/repos/${owner}/${repo}`);

  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await githubApi.get(`/users/${username}`);

  return response.data;
};

export const getStarredRepositories = async ({ username, pageParam = 1 }) => {
  const response = await githubApi.get(`/users/${username}/starred`, {
    params: {
      page: pageParam,
      per_page: 20,
    },
  });

  return response.data;
};
