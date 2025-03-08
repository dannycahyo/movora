export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}
