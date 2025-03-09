import { mockMovieData } from "./mockMovieData";

jest.mock("@/src/utils/tmdb", () => ({
  tmdbAPI: {
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
      ],
    }),
  },
}));

jest.mock("@/src/hooks/useMovies", () => ({
  useTrendingMovies: jest.fn(),
  useUpcomingMovies: jest.fn(),
  usePopularMovies: jest.fn(),
  useTopRatedMovies: jest.fn(),
  useSearchMovies: jest.fn(),
  useMovieDetails: jest.fn(),
  useMovieCredits: jest.fn(),
  useSimilarMovies: jest.fn(),
  useDiscoverMovies: jest.fn(),
  useGenres: jest.fn(),
  movieKeys: {
    all: () => ["movies"],
    trending: () => ["movies", "trending"],
    popular: () => ["movies", "popular"],
    upcoming: () => ["movies", "upcoming"],
    topRated: () => ["movies", "topRated"],
    search: (query: string, page?: number) =>
      ["search", query, page || 1] as const,
  },
}));

export const getMockedMovieHooks = () =>
  jest.requireMock("@/src/hooks/useMovies");

export const setupMocksWithData = () => {
  const mockedHooks = getMockedMovieHooks();

  mockedHooks.useTrendingMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  mockedHooks.useUpcomingMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  mockedHooks.usePopularMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  mockedHooks.useTopRatedMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  mockedHooks.useSearchMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
    error: null,
  });

  mockedHooks.useDiscoverMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
    error: null,
  });

  mockedHooks.useGenres.mockReturnValue({
    data: {
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
      ],
    },
    isLoading: false,
    error: null,
  });

  mockedHooks.useMovieDetails.mockReturnValue({
    data: {
      id: 1,
      title: "Movie Detail",
      overview: "Movie overview text",
      backdrop_path: "/backdrop.jpg",
      poster_path: "/poster.jpg",
      release_date: "2023-01-01",
      runtime: 120,
      genres: [{ id: 28, name: "Action" }],
      vote_average: 8.5,
      tagline: "A tagline for the movie",
    },
    isLoading: false,
    isError: false,
  });

  mockedHooks.useMovieCredits.mockReturnValue({
    data: {
      id: 1,
      cast: [
        {
          cast_id: 1,
          character: "Character 1",
          name: "Actor 1",
          profile_path: "/profile1.jpg",
        },
      ],
      crew: [
        {
          id: 1,
          department: "Directing",
          job: "Director",
          name: "Director Name",
        },
      ],
    },
    isLoading: false,
  });

  mockedHooks.useSimilarMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  return mockedHooks;
};

export const setupMocksLoading = () => {
  const mockedHooks = getMockedMovieHooks();

  mockedHooks.useTrendingMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useUpcomingMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.usePopularMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useTopRatedMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useSearchMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  });

  mockedHooks.useDiscoverMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  });

  mockedHooks.useGenres.mockReturnValue({
    data: {
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
      ],
    },
    isLoading: false,
    error: null,
  });

  mockedHooks.useMovieDetails.mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
  });

  mockedHooks.useMovieCredits.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useSimilarMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  return mockedHooks;
};

export const setupMocksPartialData = () => {
  const mockedHooks = getMockedMovieHooks();

  mockedHooks.useTrendingMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  mockedHooks.useUpcomingMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.usePopularMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
  });

  mockedHooks.useTopRatedMovies.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useSearchMovies.mockReturnValue({
    data: mockMovieData,
    isLoading: false,
    error: null,
  });

  mockedHooks.useGenres.mockReturnValue({
    data: {
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
      ],
    },
    isLoading: false,
    error: null,
  });

  mockedHooks.useMovieDetails.mockReturnValue({
    data: {
      id: 1,
      title: "Movie Detail",
      overview: "Movie overview text",
      backdrop_path: "/backdrop.jpg",
      poster_path: "/poster.jpg",
      release_date: "2023-01-01",
      runtime: 120,
      genres: [{ id: 28, name: "Action" }],
      vote_average: 8.5,
    },
    isLoading: false,
    isError: false,
  });

  mockedHooks.useMovieCredits.mockReturnValue({
    data: {
      id: 1,
      cast: [],
      crew: [],
    },
    isLoading: false,
  });

  mockedHooks.useSimilarMovies.mockReturnValue({
    data: {
      ...mockMovieData,
      results: [],
    },
    isLoading: false,
  });

  return mockedHooks;
};

export const clearAllMocks = () => {
  const mockedHooks = getMockedMovieHooks();
  jest.clearAllMocks();
  return mockedHooks;
};
