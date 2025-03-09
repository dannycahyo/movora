import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import TVShowCard from "@/src/components/card/TVShowCard";
import Pagination from "@/src/components/ui/Pagination";
import {
  useDiscoverTVShows,
  useTVGenres,
} from "@/src/hooks/useTVShows";

interface TVShowsScreenProps {
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
  {
    value: "first_air_date.desc",
    label: "Release Date (New to Old)",
  },
  { value: "first_air_date.asc", label: "Release Date (Old to New)" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "name.asc", label: "Title (A-Z)" },
  { value: "name.desc", label: "Title (Z-A)" },
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

export default function TVShowsScreen({
  initialYear = "",
  initialGenreId = "",
  initialSortBy = "popularity.desc",
  initialPage = 1,
}: TVShowsScreenProps) {
  const router = useRouter();
  const [year, setYear] = useState(initialYear);
  const [genreId, setGenreId] = useState(initialGenreId);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data: genresData } = useTVGenres();

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

  const { data, isLoading, error } = useDiscoverTVShows({
    year,
    genreId,
    sortBy,
    page: currentPage,
  });

  const tvShows = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 0, 500); // TMDB API limits to 500 pages max

  const handleFilterChange =
    (filterType: "year" | "genre" | "sort") =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const newParams: Record<string, string> = {
        year: filterType === "year" ? value : year,
        genre: filterType === "genre" ? value : genreId,
        sort_by: filterType === "sort" ? value : sortBy,
        page: "1", // Reset to first page when changing filters
      };

      Object.keys(newParams).forEach((key) => {
        if (!newParams[key]) delete newParams[key];
      });

      router.push(
        {
          pathname: "/tv-shows",
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
        pathname: "/tv-shows",
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
          <h1 className="text-2xl font-bold mb-4">TV Shows</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Year Select */}
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

            {/* Genre Select */}
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

            {/* Sort By Select */}
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
              ? "Loading TV shows..."
              : `Showing ${data?.results?.length || 0} of ${
                  data?.total_results || 0
                } TV shows`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center my-12 text-red-400">
            An error occurred while loading TV shows. Please try again
            later.
          </div>
        ) : tvShows.length === 0 ? (
          <div className="text-center my-12">
            <p className="text-xl mb-4">No TV shows found.</p>
            <p className="text-gray-400">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {tvShows.map((show) => (
              <TVShowCard
                key={show.id}
                id={show.id}
                title={show.name}
                posterPath={show.poster_path || ""}
                rating={show.vote_average}
                firstAirDate={show.first_air_date}
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
