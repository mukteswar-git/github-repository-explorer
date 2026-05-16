export const queryKeys = {
  repos: {
    all: ["repos"],

    search: (query, sort) => ["repos", "search", query, sort],

    details: (owner, repo) => ["repos", owner, repo],
  },

  users: {
    profile: (username) => ["users", username],

    starred: (username) => ["users", username, "starred"],
  },
};
