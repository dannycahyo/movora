import type { BaseMovie } from "./MovieBase";

export interface MovieList extends BaseMovie {
  genre_ids: number[];
  media_type?: string;
}

export interface MovieListResponse {
  page: number;
  results: MovieList[];
  total_pages: number;
  total_results: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
}
