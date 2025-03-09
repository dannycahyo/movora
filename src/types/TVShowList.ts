export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  genre_ids: number[];
  popularity: number;
  vote_count: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
}

export interface TVShowListResponse {
  page: number;
  results: TVShow[];
  total_results: number;
  total_pages: number;
}
