import { isServer } from "./environment";

import type { DiscoverParams } from "../types/DiscoverParams";
import type { TVShowsParams } from "../types/TVShowsParams";
import type { MovieListResponse } from "@/src/types/MovieList";
import type { MovieDetail } from "@/src/types/MovieDetail";
import type { MovieCredits } from "@/src/types/MovieCredits";
import type { GenreListResponse } from "@/src/types/GenreList";
import type { TVShowListResponse } from "@/src/types/TVShowList";
import type { TVShowDetail } from "@/src/types/TVShowDetail";
import type { TVShowCreditsResponse } from "@/src/types/TVShowCredits";

export const fetchTMDB = async <T>(endpoint: string): Promise<T> => {
  try {
    if (isServer()) {
      const BASE_URL =
        process.env.BASE_URL || "https://api.themoviedb.org/3";
      const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `TMDB API error: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    } else {
      const [path, queryString] = endpoint.split("?");
      const url = `/api/tmdb${path}${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API proxy error: ${response.status}`);
      }

      return response.json();
    }
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
};

export const tmdbAPI = {
  getTrending: (
    timeWindow: string | undefined = "day",
    page: number | undefined = 1,
  ) =>
    fetchTMDB<MovieListResponse>(
      `/trending/movie/${timeWindow}?language=en-US&page=${page}`,
    ),

  getPopular: () =>
    fetchTMDB<MovieListResponse>(
      "/movie/popular?language=en-US&page=1",
    ),
  getUpcoming: () =>
    fetchTMDB<MovieListResponse>(
      "/movie/upcoming?language=en-US&page=1",
    ),
  getTopRated: () =>
    fetchTMDB<MovieListResponse>(
      "/movie/top_rated?language=en-US&page=1",
    ),
  getMovieDetails: (id: number) =>
    fetchTMDB<MovieDetail>(`/movie/${id}?language=en-US`),
  getMovieCredits: (id: number) =>
    fetchTMDB<MovieCredits>(`/movie/${id}/credits?language=en-US`),
  getSimilarMovies: (id: number) =>
    fetchTMDB<MovieListResponse>(
      `/movie/${id}/similar?language=en-US&page=1`,
    ),
  searchMoviesWithPage: (query: string, page: number = 1) =>
    fetchTMDB<MovieListResponse>(
      `/search/movie?language=en-US&query=${encodeURIComponent(
        query,
      )}&page=${page}&include_adult=false`,
    ),
  discoverMovies: (params: DiscoverParams) => {
    const {
      year,
      genreId,
      sortBy = "popularity.desc",
      page = 1,
    } = params;

    const queryParams: Record<string, string> = {
      language: "en-US",
      page: String(page),
      include_adult: "false",
      sort_by: sortBy,
    };

    if (year) {
      queryParams.primary_release_year = year;
    }

    if (genreId) {
      queryParams.with_genres = genreId;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    return fetchTMDB<MovieListResponse>(
      `/discover/movie?${queryString}`,
    );
  },

  getGenres: () =>
    fetchTMDB<GenreListResponse>("/genre/movie/list?language=en"),

  getTVGenres: () =>
    fetchTMDB<GenreListResponse>("/genre/tv/list?language=en"),

  getPopularTVShows: () =>
    fetchTMDB<TVShowListResponse>(
      "/tv/popular?language=en-US&page=1",
    ),

  getTopRatedTVShows: () =>
    fetchTMDB<TVShowListResponse>(
      "/tv/top_rated?language=en-US&page=1",
    ),

  searchTVShowsWithPage: (query: string, page: number = 1) =>
    fetchTMDB<TVShowListResponse>(
      `/search/tv?language=en-US&query=${encodeURIComponent(
        query,
      )}&page=${page}&include_adult=false`,
    ),

  discoverTVShows: (params: TVShowsParams) => {
    const {
      year,
      genreId,
      sortBy = "popularity.desc",
      page = 1,
    } = params;

    const queryParams: Record<string, string> = {
      language: "en-US",
      page: String(page),
      include_adult: "false",
      sort_by: sortBy,
    };

    if (year) {
      queryParams.first_air_date_year = year;
    }

    if (genreId) {
      queryParams.with_genres = genreId;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    return fetchTMDB<TVShowListResponse>(
      `/discover/tv?${queryString}`,
    );
  },

  getTVShowDetails: (id: number) =>
    fetchTMDB<TVShowDetail>(`/tv/${id}?language=en-US`),

  getTVShowCredits: (id: number) =>
    fetchTMDB<TVShowCreditsResponse>(
      `/tv/${id}/credits?language=en-US`,
    ),

  getSimilarTVShows: (id: number) =>
    fetchTMDB<TVShowListResponse>(
      `/tv/${id}/similar?language=en-US&page=1`,
    ),
};
