import { useQuery } from "@tanstack/react-query";
import { tmdbAPI } from "@/src/utils/tmdb";
import type { MovieListResponse } from "@/src/types/MovieList";
import type { DiscoverParams } from "../types/DiscoverParams";

export const movieKeys = {
  all: ["movies"] as const,
  trending: (timeWindow?: string, page?: number) =>
    [
      ...movieKeys.all,
      "trending",
      timeWindow || "day",
      page || 1,
    ] as const,
  popular: () => [...movieKeys.all, "popular"] as const,
  upcoming: () => [...movieKeys.all, "upcoming"] as const,
  topRated: () => [...movieKeys.all, "top-rated"] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  credits: (id: number) => [...movieKeys.all, "credits", id] as const,
  similar: (id: number) => [...movieKeys.all, "similar", id] as const,
  search: (query: string, page?: number) =>
    [...movieKeys.all, "search", query, page || 1] as const,
  discover: (params: DiscoverParams) =>
    [
      ...movieKeys.all,
      "discover",
      params.year || "all",
      params.genreId || "all",
      params.sortBy || "popularity.desc",
      params.page || 1,
    ] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
};

export const useTrendingMovies = (
  timeWindow: string | undefined = "day",
  page: number | undefined = 1,
  queryFn?: () => Promise<MovieListResponse>,
) => {
  return useQuery({
    queryKey: movieKeys.trending(timeWindow, page),
    queryFn: queryFn || (() => tmdbAPI.getTrending(timeWindow, page)),
    staleTime: 1000 * 60 * 5, // 5 minutes
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
  queryFn?: () => Promise<MovieListResponse>,
) => {
  return useQuery({
    queryKey: movieKeys.search(query, page),
    queryFn:
      queryFn || (() => tmdbAPI.searchMoviesWithPage(query, page)),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDiscoverMovies = (
  params: DiscoverParams,
  queryFn?: () => Promise<MovieListResponse>,
) => {
  return useQuery({
    queryKey: movieKeys.discover(params),
    queryFn: queryFn || (() => tmdbAPI.discoverMovies(params)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: tmdbAPI.getGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres rarely change
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => tmdbAPI.getMovieDetails(id),
    enabled: !!id,
  });
};

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => tmdbAPI.getMovieCredits(id),
    enabled: !!id,
  });
};

export const useSimilarMovies = (id: number) => {
  return useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => tmdbAPI.getSimilarMovies(id),
    enabled: !!id,
  });
};
