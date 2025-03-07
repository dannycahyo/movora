import { GetServerSideProps } from "next";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/src/utils/reactQuery";
import { tmdbAPI } from "@/src/utils/tmdb";
import { movieKeys } from "@/src/hooks/useMovies";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: movieKeys.trending(),
        queryFn: tmdbAPI.getTrending,
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.popular(),
        queryFn: tmdbAPI.getPopular,
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.upcoming(),
        queryFn: tmdbAPI.getUpcoming,
      }),
      queryClient.prefetchQuery({
        queryKey: movieKeys.topRated(),
        queryFn: tmdbAPI.getTopRated,
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("Error prefetching data:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};

export default function Home() {
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
