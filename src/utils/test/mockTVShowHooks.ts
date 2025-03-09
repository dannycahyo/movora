import { mockTVShowData } from "./mockTVShowData";

jest.mock("@/src/utils/tmdb", () => ({
  tmdbAPI: {
    getTrendingTVShows: jest.fn().mockResolvedValue(mockTVShowData),
    getPopularTVShows: jest.fn().mockResolvedValue(mockTVShowData),
    getTopRatedTVShows: jest.fn().mockResolvedValue(mockTVShowData),
    searchTVShowsWithPage: jest
      .fn()
      .mockResolvedValue(mockTVShowData),
    getTVShowDetails: jest.fn().mockResolvedValue({
      id: 1,
      name: "TV Show Detail",
      overview: "TV show overview text",
    }),
    getTVShowCredits: jest.fn().mockResolvedValue({
      id: 1,
      cast: [],
      crew: [],
    }),
    getSimilarTVShows: jest.fn().mockResolvedValue(mockTVShowData),
    discoverTVShows: jest.fn().mockResolvedValue(mockTVShowData),
  },
}));

jest.mock("@/src/hooks/useTVShows", () => ({
  useTrendingTVShows: jest.fn(),
  usePopularTVShows: jest.fn(),
  useTopRatedTVShows: jest.fn(),
  useSearchTVShows: jest.fn(),
  useTVShowDetails: jest.fn(),
  useTVShowCredits: jest.fn(),
  useSimilarTVShows: jest.fn(),
  useDiscoverTVShows: jest.fn(),
  tvShowKeys: {
    all: () => ["tvshows"],
    trending: () => ["tvshows", "trending"],
    popular: () => ["tvshows", "popular"],
    topRated: () => ["tvshows", "topRated"],
    search: (query: string, page?: number) =>
      ["search", "tvshows", query, page || 1] as const,
  },
}));

export const getMockedTVShowHooks = () =>
  jest.requireMock("@/src/hooks/useTVShows");

export const setupTVMocksWithData = () => {
  const mockedHooks = getMockedTVShowHooks();

  mockedHooks.useTrendingTVShows.mockReturnValue({
    data: mockTVShowData,
    isLoading: false,
  });

  mockedHooks.usePopularTVShows.mockReturnValue({
    data: mockTVShowData,
    isLoading: false,
  });

  mockedHooks.useTopRatedTVShows.mockReturnValue({
    data: mockTVShowData,
    isLoading: false,
  });

  mockedHooks.useSearchTVShows.mockReturnValue({
    data: mockTVShowData,
    isLoading: false,
    error: null,
  });

  mockedHooks.useDiscoverTVShows.mockReturnValue({
    data: mockTVShowData,
    isLoading: false,
    error: null,
  });

  mockedHooks.useTVShowDetails.mockReturnValue({
    data: {
      id: 1,
      name: "TV Show Detail",
      overview: "TV show overview text",
      backdrop_path: "/backdrop.jpg",
      poster_path: "/poster.jpg",
      first_air_date: "2023-01-01",
      last_air_date: "2023-12-31",
      episode_run_time: [30],
      number_of_episodes: 10,
      number_of_seasons: 1,
      genres: [{ id: 18, name: "Drama" }],
      vote_average: 8.5,
      status: "Returning Series",
      created_by: [
        {
          id: 1,
          name: "Creator Name",
          profile_path: null,
          credit_id: "credit123",
        },
      ],
      networks: [
        {
          id: 1,
          name: "Network Name",
          logo_path: "/network-logo.png",
        },
      ],
      seasons: [],
      production_companies: [],
      production_countries: [],
      spoken_languages: [],
      homepage: "",
      in_production: true,
      languages: ["en"],
      last_episode_to_air: null,
      next_episode_to_air: null,
      origin_country: ["US"],
      original_language: "en",
      original_name: "TV Show Detail",
      popularity: 100,
      tagline: "Tagline text",
      type: "Scripted",
      vote_count: 1000,
    },
    isLoading: false,
    isError: false,
  });

  mockedHooks.useTVShowCredits.mockReturnValue({
    data: {
      id: 1,
      cast: [
        {
          id: 1,
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

  mockedHooks.useSimilarTVShows.mockReturnValue({
    data: mockTVShowData,
    isLoading: false,
  });

  return mockedHooks;
};

export const setupTVMocksLoading = () => {
  const mockedHooks = getMockedTVShowHooks();

  mockedHooks.useTrendingTVShows.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.usePopularTVShows.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useTopRatedTVShows.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useSearchTVShows.mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  });

  mockedHooks.useDiscoverTVShows.mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  });

  mockedHooks.useTVShowDetails.mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
  });

  mockedHooks.useTVShowCredits.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  mockedHooks.useSimilarTVShows.mockReturnValue({
    data: undefined,
    isLoading: true,
  });

  return mockedHooks;
};

export const clearAllMocks = () => {
  const mockedHooks = getMockedTVShowHooks();
  jest.clearAllMocks();
  return mockedHooks;
};
