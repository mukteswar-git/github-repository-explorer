export const queryKeys = {
  repos: {
    all: ["repos"],

    search: (query) => ["repos", "search", query],

    details: (owner, repo) => ["repos", owner, repo],
  },

  users: {
    profile: (username) => ["users", username],

    starred: (username) => ["users", username, "starred"],
  },
};
