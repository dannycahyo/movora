import { Genre } from "./GenreList";

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TVShowDetail {
  id: number;
  name: string;
  original_name: string;
  overview: string | null;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: Genre[];
  first_air_date: string;
  last_air_date: string;
  episode_run_time: number[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  created_by: CreatedBy[];
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  popularity: number;
  production_companies: ProductionCompany[];
  seasons: Season[];
  status: string;
  tagline: string | null;
  type: string;
  vote_average: number;
  vote_count: number;
}
