import { Link, useParams } from "react-router-dom";

import { useRepoDetails } from "../hooks/useRepoDetails";

import RepoDetailsSkeleton from "../components/skeletons/RepoDetailsSkeleton";

import ErrorMessage from "../components/ui/ErrorMessage";

function RepoDetails() {
  const { owner, repo } = useParams();

  const { data, isLoading, isError, error } = useRepoDetails(owner, repo);

  if (isLoading) {
    return <RepoDetailsSkeleton />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-700
        bg-slate-800
        p-6
      "
    >
      <div className="flex items-center gap-4">
        <img
          src={data.owner.avatar_url}
          alt={data.owner.login}
          className="h-16 w-16 rounded-full"
        />

        <div>
          <h1 className="text-3xl font-bold">{data.full_name}</h1>

          <Link
            to={`/users/${data.owner.login}`}
            className="
              text-blue-400
              hover:underline
            "
          >
            {data.owner.login}
          </Link>
        </div>
      </div>

      <p className="mt-6 text-slate-300">{data.description}</p>

      <div
        className="
          mt-6
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <div
          className="
            rounded-lg
            bg-slate-900
            p-4
          "
        >
          <p className="text-slate-400">Stars</p>

          <p className="mt-1 text-xl font-semibold">
            ⭐ {data.stargazers_count}
          </p>
        </div>

        <div
          className="
            rounded-lg
            bg-slate-900
            p-4
          "
        >
          <p className="text-slate-400">Forks</p>

          <p className="mt-1 text-xl font-semibold">🍴 {data.forks_count}</p>
        </div>

        <div
          className="
            rounded-lg
            bg-slate-900
            p-4
          "
        >
          <p className="text-slate-400">Open Issues</p>

          <p className="mt-1 text-xl font-semibold">{data.open_issues_count}</p>
        </div>

        <div
          className="
            rounded-lg
            bg-slate-900
            p-4
          "
        >
          <p className="text-slate-400">Language</p>

          <p className="mt-1 text-xl font-semibold">{data.language}</p>
        </div>
      </div>

      {data.topics?.length > 0 && (
        <div className="mt-6">
          <h2
            className="
                mb-3
                text-xl
                font-semibold
              "
          >
            Topics
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.topics.map((topic) => (
              <span
                key={topic}
                className="
                      rounded-full
                      bg-blue-600/20
                      px-3
                      py-1
                      text-sm
                      text-blue-300
                    "
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <a
        href={data.html_url}
        target="_blank"
        rel="noreferrer"
        className="
          mt-8
          inline-block
          rounded-lg
          bg-blue-600
          px-5
          py-3
          font-medium
          transition
          hover:bg-blue-500
        "
      >
        View on GitHub
      </a>
    </div>
  );
}

export default RepoDetails;
