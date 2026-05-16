import { Link } from "react-router-dom";

function RepoCard({ repo }) {
  return (
    <Link
      to={`/repos/${repo.owner.login}/${repo.name}`}
      className="
        block
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        p-5
        transition
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
