import { useQuery } from "@tanstack/react-query";
import { tmdbAPI } from "@/src/utils/tmdb";
import type { MovieResponse } from "@/src/types/Movie";

export const movieKeys = {
  all: ["movies"] as const,
  trending: () => [...movieKeys.all, "trending"] as const,
  popular: () => [...movieKeys.all, "popular"] as const,
  upcoming: () => [...movieKeys.all, "upcoming"] as const,
  topRated: () => [...movieKeys.all, "top-rated"] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  search: (query: string, page?: number) =>
    [...movieKeys.all, "search", query, page || 1] as const,
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

export const useSearchMovies = (
  query: string,
  page: number = 1,
  queryFn?: () => Promise<MovieResponse>,
) => {
  return useQuery({
    queryKey: movieKeys.search(query, page),
    queryFn:
      queryFn || (() => tmdbAPI.searchMoviesWithPage(query, page)),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
