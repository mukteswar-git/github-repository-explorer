import { useEffect } from "react";

import { useInView } from "react-intersection-observer";

import RepoCard from "../components/repo/RepoCard";

import { useUserProfile } from "../hooks/useUserProfile";

import { useStarredRepos } from "../hooks/useStarredRepos";

import { useParams } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();

  const { data, isLoading, isError, error } = useUserProfile(username);

  const {
    data: starredData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStarredRepos(username);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const starredRepos = starredData?.pages.flatMap((page) => page) || [];

  if (isLoading) {
    return <p className="text-slate-400">Loading profile...</p>;
  }

  if (isError) {
    return <p className="text-red-400">{error.message}</p>;
  }

  return (
    <div>
      <div
        className="
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
          "
        >
          <img
            src={data.avatar_url}
            alt={data.login}
            className="
              h-32
              w-32
              rounded-full
            "
          />

          <div className="flex-1">
            <h1
              className="
                text-3xl
                font-bold
              "
            >
              {data.name || data.login}
            </h1>

            <p className="mt-2 text-slate-400">@{data.login}</p>

            {data.bio && <p className="mt-4 text-slate-300">{data.bio}</p>}

            <div
              className="
                mt-6
                grid
                gap-4
                md:grid-cols-2
              "
            >
              <div>
                <p className="text-slate-400">Followers</p>

                <p className="text-xl font-semibold">{data.followers}</p>
              </div>

              <div>
                <p className="text-slate-400">Following</p>

                <p className="text-xl font-semibold">{data.following}</p>
              </div>

              <div>
                <p className="text-slate-400">Public Repositories</p>

                <p className="text-xl font-semibold">{data.public_repos}</p>
              </div>

              <div>
                <p className="text-slate-400">Location</p>

                <p className="text-xl font-semibold">
                  {data.location || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Company</p>

                <p className="text-xl font-semibold">
                  {data.company || "Not specified"}
                </p>
              </div>
            </div>

            <a
              href={data.html_url}
              target="_blank"
              rel="noreferrer"
              className="
                mt-6
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
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2
          className="
            mb-6
            text-2xl
            font-bold
          "
        >
          Starred Repositories
        </h2>

        {starredRepos.length === 0 && (
          <p className="text-slate-400">No starred repositories</p>
        )}

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {starredRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        <div
          ref={ref}
          className="
            py-10
            text-center
          "
        >
          {isFetchingNextPage && (
            <p className="text-slate-400">Loading more repositories...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
