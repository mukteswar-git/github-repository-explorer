import { useState } from "react";

import SearchBar from "../components/ui/SearchBar";
import RepoCard from "../components/repo/RepoCard";
import RepoCardSkeleton from "../components/skeletons/RepoCardSkeleton";

import { useSearchRepos } from "../hooks/useSearchRepos";

function Home() {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, error } = useSearchRepos(query);

  const repositories = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

      {isLoading && (
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <RepoCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && <p className="text-red-400">{error.message}</p>}

      <div className="grid gap-4">
        {repositories.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default Home;
