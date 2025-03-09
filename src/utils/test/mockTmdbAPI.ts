import { mockMovieData } from "./mockMovieData";

export const mockTmdbAPI = {
  getTrending: jest.fn().mockResolvedValue(mockMovieData),
  getPopular: jest.fn().mockResolvedValue(mockMovieData),
  getUpcoming: jest.fn().mockResolvedValue(mockMovieData),
  getTopRated: jest.fn().mockResolvedValue(mockMovieData),
  searchMoviesWithPage: jest.fn().mockResolvedValue(mockMovieData),
  getMovieDetails: jest.fn().mockResolvedValue({
    id: 1,
    title: "Movie Detail",
    overview: "Movie overview text",
  }),
  getMovieCredits: jest.fn().mockResolvedValue({
    id: 1,
    cast: [],
    crew: [],
  }),
  getSimilarMovies: jest.fn().mockResolvedValue(mockMovieData),
  discoverMovies: jest.fn().mockResolvedValue(mockMovieData),
  getGenres: jest.fn().mockResolvedValue({
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
    ],
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockResponse = (data: any): Promise<any> => {
  return Promise.resolve(data);
};
