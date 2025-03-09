import type { TVShowListResponse } from "@/src/types/TVShowList";

export const mockTVShowData: TVShowListResponse = {
  results: [
    {
      id: 1,
      name: "TV Show 1",
      poster_path: "/path1.jpg",
      backdrop_path: "/backdrop1.jpg",
      vote_average: 8.5,
      first_air_date: "2023-01-15",
      overview: "This is the overview for TV Show 1",
      genre_ids: [18, 10765],
      original_language: "en",
      original_name: "TV Show 1",
      origin_country: ["US"],
      popularity: 100.5,
      vote_count: 1500,
    },
    {
      id: 2,
      name: "TV Show 2",
      poster_path: "/path2.jpg",
      backdrop_path: "/backdrop2.jpg",
      vote_average: 7.5,
      first_air_date: "2023-02-20",
      overview: "This is the overview for TV Show 2",
      genre_ids: [10759, 10765],
      original_language: "en",
      original_name: "TV Show 2",
      origin_country: ["US"],
      popularity: 95.2,
      vote_count: 1200,
    },
  ],
  page: 1,
  total_pages: 10,
  total_results: 20,
};
