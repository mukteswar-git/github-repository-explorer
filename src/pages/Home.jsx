import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import SearchBar from "../components/ui/SearchBar";
import RepoCard from "../components/repo/RepoCard";
import RepoCardSkeleton from "../components/skeletons/RepoCardSkeleton";

import { useSearchRepos } from "../hooks/useSearchRepos";

import EmptyState from "../components/ui/EmptyState";

import ErrorMessage from "../components/ui/ErrorMessage";

function Home() {
  const [query, setQuery] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchRepos(query);

  const repositories = data?.pages.flatMap((page) => page.items) || [];

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

      {!query && (
        <EmptyState
          title="Search GitHub repositories"
          description="Find repositories, developers, and open-source projects."
        />
      )}

      {isLoading && (
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <RepoCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && <ErrorMessage message={error.message} />}

      {!isLoading && query && repositories.length === 0 && (
        <EmptyState
          title="No repositories found"
          description="Try another search keyword."
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {repositories.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      <div ref={ref} className="py-10 text-center">
        {isFetchingNextPage && (
          <p className="text-slate-400">Loading more repositories...</p>
        )}

        {!hasNextPage && query && repositories.length > 0 && (
          <p className="text-slate-500">No more repositories</p>
        )}
      </div>
    </div>
  );
}

export default Home;
