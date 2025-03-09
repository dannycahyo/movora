export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
}
export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
}
export interface TVShowCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
