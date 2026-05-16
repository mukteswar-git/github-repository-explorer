import { useEffect, useState, useCallback } from "react";

export const useSearchHistory = () => {
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("search-history");

    return stored ? JSON.parse(stored) : [];
  });

  const removeSearch = (searchTerm) => {
    const updatedHistory = history.filter(
      (item) => item !== searchTerm
    );

    setHistory(updatedHistory);

    localStorage.setItem(
      "github-search-history",
      JSON.stringify(updatedHistory)
    );
  };

  useEffect(() => {
    localStorage.setItem("search-history", JSON.stringify(history));
  }, [history]);

  const addSearch = useCallback((query) => {
    if (!query.trim()) return;

    setHistory((prev) =>
      [query, ...prev.filter((item) => item !== query)].slice(0, 5),
    );
  }, []);

  return {
    history,
    addSearch,
    removeSearch
  };
};
