import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import MovieCard from "@/src/components/card/MovieCard";
import Pagination from "@/src/components/ui/Pagination";
import { useSearchMovies } from "@/src/hooks/useMovies";
import { tmdbAPI } from "@/src/utils/tmdb";

interface SearchMoviesScreenProps {
  initialQuery: string;
  initialPage?: number;
}

export default function SearchMoviesScreen({
  initialQuery,
  initialPage = 1,
}: SearchMoviesScreenProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const { query: queryParam, page: pageParam } = router.query;

    if (typeof queryParam === "string" && queryParam !== query) {
      setQuery(queryParam);
    }

    if (typeof pageParam === "string") {
      const parsedPage = parseInt(pageParam);
      if (!isNaN(parsedPage) && parsedPage !== currentPage) {
        setCurrentPage(parsedPage);
      }
    } else if (currentPage !== initialPage) {
      setCurrentPage(initialPage);
    }
  }, [router.query, initialPage, query, currentPage]);

  const fetchSearchResults = async () => {
    return tmdbAPI.searchMoviesWithPage(query, currentPage);
  };

  const { data, isLoading, error } = useSearchMovies(
    query,
    currentPage,
    fetchSearchResults,
  );
  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  const handlePageChange = (page: number) => {
    router.push(
      {
        pathname: "/search",
        query: { query, page },
      },
      undefined,
      { scroll: true },
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Search results for: &quot;{query}&quot;
          </h1>
          <p className="text-gray-400">
            {data?.total_results || 0} results found
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center my-12 text-red-400">
            An error occurred while searching. Please try again later.
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center my-12">
            <p className="text-xl mb-4">
              No movies found matching your search.
            </p>
            <p className="text-gray-400">
              Try adjusting your search terms or browse our categories
              instead.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path || ""}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
              />
            ))}
          </div>
        )}

        {!isLoading && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
