import { isServer } from "./environment";

import type { Movie, MovieResponse } from "@/src/types/Movie";

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
  getTrending: () =>
    fetchTMDB<MovieResponse>("/trending/movie/day?language=en-US"),
  getPopular: () =>
    fetchTMDB<MovieResponse>("/movie/popular?language=en-US&page=1"),
  getUpcoming: () =>
    fetchTMDB<MovieResponse>("/movie/upcoming?language=en-US&page=1"),
  getTopRated: () =>
    fetchTMDB<MovieResponse>(
      "/movie/top_rated?language=en-US&page=1",
    ),
  getMovieDetails: (id: number) =>
    fetchTMDB<Movie>(`/movie/${id}?language=en-US`),
  searchMovies: (query: string) =>
    fetchTMDB<MovieResponse>(
      `/search/movie?language=en-US&query=${encodeURIComponent(
        query,
      )}&page=1&include_adult=false`,
    ),
  searchMoviesWithPage: (query: string, page: number = 1) =>
    fetchTMDB<MovieResponse>(
      `/search/movie?language=en-US&query=${encodeURIComponent(
        query,
      )}&page=${page}&include_adult=false`,
    ),
};
