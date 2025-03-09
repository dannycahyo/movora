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
    data: undefined,
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

  return mockedHooks;
};

export const clearAllMocks = () => {
  const mockedHooks = getMockedMovieHooks();
  jest.clearAllMocks();
  return mockedHooks;
};
