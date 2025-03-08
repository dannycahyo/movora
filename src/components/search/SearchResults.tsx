import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import type { MovieList } from "@/src/types/MovieList";

interface SearchResultsProps {
  results: MovieList[];
  isLoading: boolean;
  query: string;
  onResultClick: () => void;
}

export default function SearchResults({
  results,
  isLoading,
  query,
  onResultClick,
}: SearchResultsProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setVisible(query.length > 2);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!visible) return null;

  const resultsToShow = isMobile ? 3 : 8;
  const displayedResults = results.slice(0, resultsToShow);
  const remainingResults = results.length - resultsToShow;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-xl max-h-[70vh] overflow-y-auto z-50"
    >
      {isLoading ? (
        <div className="p-4 text-center text-gray-400">
          <div className="flex justify-center my-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-red-500"></div>
          </div>
          Searching...
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No movies found for &quot;{query}&quot;
        </div>
      ) : (
        <div className="py-2">
          <h3 className="text-xs font-medium text-gray-400 px-4 py-2 uppercase">
            Search Results
          </h3>
          <ul className="divide-y divide-gray-700">
            {displayedResults.map((movie) => (
              <li key={movie.id} className="hover:bg-gray-700">
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex items-center p-3 space-x-3"
                  onClick={onResultClick}
                >
                  <div className="flex-shrink-0 w-12 h-16 bg-gray-700 rounded overflow-hidden relative">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {movie.release_date?.substring(0, 4) ||
                        "Unknown year"}
                    </p>
                    <div className="flex items-center mt-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs ml-1">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {remainingResults > 0 && (
              <li className="text-center py-2 text-sm text-red-500 hover:text-red-400">
                <Link
                  href={`/search?query=${encodeURIComponent(query)}`}
                  onClick={onResultClick}
                  className="block py-2"
                >
                  View all{" "}
                  {remainingResults > 0
                    ? `${remainingResults} more of `
                    : ""}
                  {results.length} results
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
