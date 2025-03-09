import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import MovieCard from "@/src/components/card/MovieCard";
import Pagination from "@/src/components/ui/Pagination";
import { useTrendingMovies } from "@/src/hooks/useMovies";

interface TrendingMoviesScreenProps {
  initialTimeWindow: string;
  initialPage?: number;
}

type TimeWindowOption = {
  value: string;
  label: string;
};

const TIME_WINDOW_OPTIONS: TimeWindowOption[] = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
];

export default function TrendingMoviesScreen({
  initialTimeWindow = "day",
  initialPage = 1,
}: TrendingMoviesScreenProps) {
  const router = useRouter();
  const [timeWindow, setTimeWindow] = useState(initialTimeWindow);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const { time: timeParam, page: pageParam } = router.query;

    if (
      typeof timeParam === "string" &&
      (timeParam === "day" || timeParam === "week") &&
      timeParam !== timeWindow
    ) {
      setTimeWindow(timeParam);
    }

    if (typeof pageParam === "string") {
      const parsedPage = parseInt(pageParam);
      if (!isNaN(parsedPage) && parsedPage !== currentPage) {
        setCurrentPage(parsedPage);
      }
    } else if (currentPage !== initialPage) {
      setCurrentPage(initialPage);
    }
  }, [router.query, initialPage, timeWindow, currentPage]);

  const { data, isLoading, error } = useTrendingMovies(
    timeWindow,
    currentPage,
  );

  const movies = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 0, 500);

  const handleTimeWindowChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newTimeWindow = e.target.value;
    router.push(
      {
        pathname: "/trending",
        query: { time: newTimeWindow, page: 1 },
      },
      undefined,
      { scroll: true },
    );
  };

  const handlePageChange = (page: number) => {
    router.push(
      {
        pathname: "/trending",
        query: { time: timeWindow, page },
      },
      undefined,
      { scroll: true },
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-bold mb-2"
              data-testid="trending-title"
            >
              Trending Movies
            </h1>
            <p
              className="text-gray-400"
              data-testid="trending-subtitle"
            >
              Popular movies trending{" "}
              {timeWindow === "day" ? "today" : "this week"}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <label
              htmlFor="time-window"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Time Period
            </label>
            <select
              id="time-window"
              value={timeWindow}
              onChange={handleTimeWindowChange}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              data-testid="time-window-filter"
            >
              {TIME_WINDOW_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <p className="text-gray-400" data-testid="movies-count">
            {isLoading
              ? "Loading trending movies..."
              : `Showing ${data?.results?.length || 0} of ${
                  data?.total_results || 0
                } trending movies`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"
              data-testid="loading-spinner"
              role="status"
            ></div>
          </div>
        ) : error ? (
          <div
            className="text-center my-12 text-red-400"
            data-testid="error-message"
          >
            An error occurred while loading trending movies. Please
            try again later.
          </div>
        ) : movies.length === 0 ? (
          <div
            className="text-center my-12"
            data-testid="empty-message"
          >
            <p className="text-xl mb-4">No trending movies found.</p>
            <p className="text-gray-400">
              Try selecting a different time period.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
            data-testid="movies-grid"
          >
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
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
