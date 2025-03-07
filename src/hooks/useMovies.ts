import { useQuery } from "@tanstack/react-query";
import { tmdbAPI } from "@/src/utils/tmdb";

export const movieKeys = {
  all: ["movies"] as const,
  trending: () => [...movieKeys.all, "trending"] as const,
  popular: () => [...movieKeys.all, "popular"] as const,
  upcoming: () => [...movieKeys.all, "upcoming"] as const,
  topRated: () => [...movieKeys.all, "top-rated"] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
};

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn: tmdbAPI.getTrending,
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: movieKeys.popular(),
    queryFn: tmdbAPI.getPopular,
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: movieKeys.upcoming(),
    queryFn: tmdbAPI.getUpcoming,
  });
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: movieKeys.topRated(),
    queryFn: tmdbAPI.getTopRated,
  });
};
