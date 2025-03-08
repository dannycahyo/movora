import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import MovieCard from "@/src/components/card/MovieCard";
import Pagination from "@/src/components/ui/Pagination";
import { useDiscoverMovies, useGenres } from "@/src/hooks/useMovies";

interface DiscoverMoviesScreenProps {
  initialYear: string;
  initialGenreId: string;
  initialSortBy: string;
  initialPage?: number;
}

type FilterOption = {
  value: string;
  label: string;
};

const SORT_OPTIONS: FilterOption[] = [
  { value: "popularity.desc", label: "Popularity (High to Low)" },
  { value: "popularity.asc", label: "Popularity (Low to High)" },
  { value: "release_date.desc", label: "Release Date (New to Old)" },
  { value: "release_date.asc", label: "Release Date (Old to New)" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "original_title.desc", label: "Title (Z-A)" },
];

const generateYearOptions = (): FilterOption[] => {
  const currentYear = new Date().getFullYear();
  const years: FilterOption[] = [{ value: "", label: "All Years" }];

  for (let year = currentYear; year >= 1900; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }

  return years;
};

const YEAR_OPTIONS = generateYearOptions();

export default function DiscoverMoviesScreen({
  initialYear = "",
  initialGenreId = "",
  initialSortBy = "popularity.desc",
  initialPage = 1,
}: DiscoverMoviesScreenProps) {
  const router = useRouter();
  const [year, setYear] = useState(initialYear);
  const [genreId, setGenreId] = useState(initialGenreId);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data: genresData } = useGenres();

  const genreOptions: FilterOption[] = [
    { value: "", label: "All Genres" },
    ...(genresData?.genres?.map((genre) => ({
      value: genre.id.toString(),
      label: genre.name,
    })) || []),
  ];

  useEffect(() => {
    const {
      year: yearParam,
      genre: genreParam,
      sort_by: sortParam,
      page: pageParam,
    } = router.query;

    if (typeof yearParam === "string" && yearParam !== year) {
      setYear(yearParam);
    }

    if (typeof genreParam === "string" && genreParam !== genreId) {
      setGenreId(genreParam);
    }

    if (typeof sortParam === "string" && sortParam !== sortBy) {
      setSortBy(sortParam);
    }

    if (typeof pageParam === "string") {
      const parsedPage = parseInt(pageParam);
      if (!isNaN(parsedPage) && parsedPage !== currentPage) {
        setCurrentPage(parsedPage);
      }
    } else if (currentPage !== initialPage) {
      setCurrentPage(initialPage);
    }
  }, [router.query, initialPage, year, genreId, sortBy, currentPage]);

  const { data, isLoading, error } = useDiscoverMovies({
    year,
    genreId,
    sortBy,
    page: currentPage,
  });

  const movies = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 0, 500); // TMDB API limits to 500 pages max

  const handleFilterChange =
    (filterType: "year" | "genre" | "sort") =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const newParams: Record<string, string> = {
        year: filterType === "year" ? value : year,
        genre: filterType === "genre" ? value : genreId,
        sort_by: filterType === "sort" ? value : sortBy,
        page: "1",
      };

      Object.keys(newParams).forEach((key) => {
        if (!newParams[key]) delete newParams[key];
      });

      router.push(
        {
          pathname: "/discover",
          query: newParams,
        },
        undefined,
        { scroll: true },
      );
    };

  const handlePageChange = (page: number) => {
    const queryParams: Record<string, string> = {
      page: page.toString(),
    };
    if (year) queryParams.year = year;
    if (genreId) queryParams.genre = genreId;
    if (sortBy) queryParams.sort_by = sortBy;

    router.push(
      {
        pathname: "/discover",
        query: queryParams,
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
          <h1 className="text-2xl font-bold mb-4">Discover Movies</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="year-filter"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Year
              </label>
              <select
                id="year-filter"
                value={year}
                onChange={handleFilterChange("year")}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              >
                {YEAR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="genre-filter"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Genre
              </label>
              <select
                id="genre-filter"
                value={genreId}
                onChange={handleFilterChange("genre")}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              >
                {genreOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sort-filter"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Sort By
              </label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={handleFilterChange("sort")}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-gray-400 mt-2">
            {isLoading
              ? "Loading movies..."
              : `Showing ${data?.results?.length || 0} of ${
                  data?.total_results || 0
                } movies`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center my-12 text-red-400">
            An error occurred while loading movies. Please try again
            later.
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center my-12">
            <p className="text-xl mb-4">No movies found.</p>
            <p className="text-gray-400">
              Try adjusting your filters to see more results.
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
