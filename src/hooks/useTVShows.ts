import { useQuery } from "@tanstack/react-query";
import { tmdbAPI } from "@/src/utils/tmdb";
import type { TVShowListResponse } from "@/src/types/TVShowList";
import type { TVShowsParams } from "@/src/types/TVShowsParams";
import type { GenreListResponse } from "@/src/types/GenreList";
import type { TVShowDetail } from "@/src/types/TVShowDetail";
import type { TVShowCreditsResponse } from "@/src/types/TVShowCredits";

export const tvShowsKeys = {
  all: ["tvshows"] as const,
  trending: (timeWindow?: string, page?: number) =>
    [
      ...tvShowsKeys.all,
      "trending",
      timeWindow || "day",
      page || 1,
    ] as const,
  popular: () => [...tvShowsKeys.all, "popular"] as const,
  topRated: () => [...tvShowsKeys.all, "top-rated"] as const,
  detail: (id: number) => [...tvShowsKeys.all, "detail", id] as const,
  credits: (id: number) =>
    [...tvShowsKeys.all, "credits", id] as const,
  similar: (id: number) =>
    [...tvShowsKeys.all, "similar", id] as const,
  search: (query: string, page?: number) =>
    [...tvShowsKeys.all, "search", query, page || 1] as const,
  discover: (params: TVShowsParams) =>
    [
      ...tvShowsKeys.all,
      "discover",
      params.year || "all",
      params.genreId || "all",
      params.sortBy || "popularity.desc",
      params.page || 1,
    ] as const,
  genres: () => [...tvShowsKeys.all, "genres"] as const,
};

export const useTVGenres = () => {
  return useQuery<GenreListResponse>({
    queryKey: tvShowsKeys.genres(),
    queryFn: tmdbAPI.getTVGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres rarely change
  });
};

export const useDiscoverTVShows = (
  params: TVShowsParams,
  queryFn?: () => Promise<TVShowListResponse>,
) => {
  return useQuery<TVShowListResponse>({
    queryKey: tvShowsKeys.discover(params),
    queryFn: queryFn || (() => tmdbAPI.discoverTVShows(params)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const usePopularTVShows = () => {
  return useQuery<TVShowListResponse>({
    queryKey: tvShowsKeys.popular(),
    queryFn: tmdbAPI.getPopularTVShows,
  });
};

export const useTopRatedTVShows = () => {
  return useQuery<TVShowListResponse>({
    queryKey: tvShowsKeys.topRated(),
    queryFn: tmdbAPI.getTopRatedTVShows,
  });
};

export const useSearchTVShows = (
  query: string,
  page: number = 1,
  queryFn?: () => Promise<TVShowListResponse>,
) => {
  return useQuery<TVShowListResponse>({
    queryKey: tvShowsKeys.search(query, page),
    queryFn:
      queryFn || (() => tmdbAPI.searchTVShowsWithPage(query, page)),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTVShowDetails = (id: number) => {
  return useQuery<TVShowDetail>({
    queryKey: tvShowsKeys.detail(id),
    queryFn: () => tmdbAPI.getTVShowDetails(id),
    enabled: !!id,
  });
};

export const useTVShowCredits = (id: number) => {
  return useQuery<TVShowCreditsResponse>({
    queryKey: tvShowsKeys.credits(id),
    queryFn: () => tmdbAPI.getTVShowCredits(id),
    enabled: !!id,
  });
};

export const useSimilarTVShows = (id: number) => {
  return useQuery<TVShowListResponse>({
    queryKey: tvShowsKeys.similar(id),
    queryFn: () => tmdbAPI.getSimilarTVShows(id),
    enabled: !!id,
  });
};
