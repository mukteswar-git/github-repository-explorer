import { Link } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { getRepositoryDetails } from "../../api/github";

import { queryKeys } from "../../constants/queryKeys";

import { saveHomeScroll } from "../../utils/scrollRestoration";

function RepoCard({ repo }) {
  const queryClient = useQueryClient();

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.repos.details(repo.owner.login, repo.name),

      queryFn: () =>
        getRepositoryDetails({
          owner: repo.owner.login,
          repo: repo.name,
        }),

      staleTime: 1000 * 60 * 5,
    });
  };

  return (
    <Link
      to={`/repos/${repo.owner.login}/${repo.name}`}
      onMouseEnter={handlePrefetch}
      onClick={saveHomeScroll}
      className="
        block
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-blue-500/10
        hover:border-blue-500
      "
    >
      <div className="flex items-center gap-3">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <h2 className="text-lg font-semibold">{repo.full_name}</h2>

          <p className="text-sm text-slate-400">{repo.owner.login}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-slate-300">{repo.description}</p>

      <div className="mt-4 flex gap-4 text-sm text-slate-400">
        <span>⭐ {repo.stargazers_count}</span>

        <span>🍴 {repo.forks_count}</span>

        <span>{repo.language}</span>
      </div>
    </Link>
  );
}

export default RepoCard;
