import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import HeroCarousel from "@/src/components/hero/HeroCarousel";
import MovieRow from "@/src/components/movie/MovieRow";

import {
  usePopularMovies,
  useTrendingMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from "@/src/hooks/useMovies";

export default function HomeScreen() {
  const { data: trendingData, isLoading: trendingLoading } =
    useTrendingMovies();
  const { data: upcomingData, isLoading: upcomingLoading } =
    useUpcomingMovies();
  const { data: popularData, isLoading: popularLoading } =
    usePopularMovies();
  const { data: topRatedData, isLoading: topRatedLoading } =
    useTopRatedMovies();

  const heroMovies = trendingData?.results?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <HeroCarousel
            movies={heroMovies}
            isLoading={trendingLoading}
          />

          <MovieRow
            title="Upcoming Movies"
            viewAllLink="/movies/upcoming"
            movies={upcomingData?.results || []}
            isLoading={upcomingLoading}
          />

          <MovieRow
            title="Popular Movies"
            viewAllLink="/movies/popular"
            movies={popularData?.results || []}
            isLoading={popularLoading}
          />

          <MovieRow
            title="Top Rated Movies"
            viewAllLink="/movies/top-rated"
            movies={topRatedData?.results || []}
            isLoading={topRatedLoading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
