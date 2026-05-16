import axios from "axios";

const githubApi = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export default githubApi;
