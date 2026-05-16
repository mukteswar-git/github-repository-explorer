import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import SearchBar from "../components/ui/SearchBar";
import RepoCard from "../components/repo/RepoCard";
import RepoCardSkeleton from "../components/skeletons/RepoCardSkeleton";

import { useSearchRepos } from "../hooks/useSearchRepos";

import EmptyState from "../components/ui/EmptyState";

import ErrorMessage from "../components/ui/ErrorMessage";

import { useSearchHistory } from "../hooks/useSearchHistory";

import { useSearchParams } from "react-router-dom";

import { restoreHomeScroll } from "../utils/scrollRestoration";

import { clearHomeScroll } from "../utils/scrollRestoration";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const sort = searchParams.get("sort") || "stars";

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { history, addSearch, removeSearch } = useSearchHistory();

  const {
    data,
    isLoading,
    isError,
    error,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchRepos(debouncedQuery, sort);

  const repositories = data?.pages.flatMap((page) => page.items) || [];

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (debouncedQuery) {
      addSearch(debouncedQuery);
    }
  }, [addSearch, debouncedQuery]);

  useEffect(() => {
    if (!isLoading && data?.pages?.length > 0) {
      restoreHomeScroll();
    }
  }, [data, isLoading]);

  useEffect(() => {
    const navigationType =
      performance.getEntriesByType("navigation")[0]?.type;

    // Only reset scroll on fresh navigation
    if (navigationType !== "back_forward") {
      clearHomeScroll();

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [debouncedQuery, sort]);

  return (
    <div>
      <SearchBar
        value={query}
        onChange={(e) =>
          setSearchParams({
            query: e.target.value,
            sort,
          })
        }
        sort={sort}
        onSortChange={(e) =>
          setSearchParams({
            query,
            sort: e.target.value,
          })
        }
      />

      {query !== debouncedQuery && (
        <p className="mb-4 text-sm text-slate-400">Searching...</p>
      )}

     <div className="mb-6 flex flex-wrap gap-3">
      {history.map((item) => (
        <div
          key={item}
          className="group relative inline-block"
        >
          <button
            onClick={() =>
              setSearchParams({
                query: item,
                sort,
              })
            }
            className="
              rounded-full
              bg-slate-800
              px-4
              py-2
              text-sm
              text-slate-300
              transition
              hover:bg-slate-700
            "
          >
            {item}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();

              removeSearch(item);
            }}
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              w-5
              scale-75
              items-center
              justify-center
              rounded-full
              bg-slate-700
              text-xs
              text-slate-300
              opacity-0
              pointer-events-none
              shadow-md
              transition-all
              duration-200
              hover:bg-red-400
              hover:text-white
              group-hover:scale-100
              group-hover:opacity-100
              group-hover:pointer-events-auto
            "
          >
            ✕
          </button>
        </div>
      ))}
     </div>

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
