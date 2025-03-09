import "@/src/utils/test/mockTVShowHooks";
import { render, screen } from "@/src/utils/test-utils";
import TVShowDetailScreen from "../TVShowDetailScreen";
import {
  setupTVMocksLoading,
  clearAllMocks,
  getMockedTVShowHooks,
} from "@/src/utils/test/mockTVShowHooks";
import {
  mockTVShowDetailsData,
  mockTVShowCreditsData,
  mockSimilarTVShowsData,
  mockTVShowError,
} from "@/src/utils/test/mockTVShowDetailData";

describe("TVShowDetailScreen", () => {
  const tvShowId = 1;

  beforeEach(() => {
    clearAllMocks();
  });

  it("renders loading state correctly", () => {
    setupTVMocksLoading();

    render(<TVShowDetailScreen tvShowId={tvShowId} />);

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    const mockedHooks = getMockedTVShowHooks();

    mockedHooks.useTVShowDetails.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockTVShowError,
    });

    render(<TVShowDetailScreen tvShowId={tvShowId} />);

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("error-title")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message").textContent).toBe(
      "Failed to load TV show",
    );
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
  });

  it("renders TV show not found state correctly", () => {
    const mockedHooks = getMockedTVShowHooks();

    mockedHooks.useTVShowDetails.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<TVShowDetailScreen tvShowId={tvShowId} />);

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("not-found-message"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
  });

  it("renders all components with TV show data", () => {
    const mockedHooks = getMockedTVShowHooks();

    mockedHooks.useTVShowDetails.mockReturnValue({
      data: mockTVShowDetailsData,
      isLoading: false,
      isError: false,
    });

    mockedHooks.useTVShowCredits.mockReturnValue({
      data: mockTVShowCreditsData,
      isLoading: false,
    });

    mockedHooks.useSimilarTVShows.mockReturnValue({
      data: mockSimilarTVShowsData,
      isLoading: false,
    });

    render(<TVShowDetailScreen tvShowId={tvShowId} />);

    // Check for header and footer
    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();

    // Check for TV show details
    expect(screen.getByTestId("tvshow-title")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-title").textContent).toContain(
      "Test TV Show",
    );
    expect(screen.getByTestId("tvshow-overview")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-overview").textContent).toBe(
      "Test overview",
    );
    expect(screen.getByTestId("tvshow-runtime")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-runtime").textContent).toBe(
      "30-45 min",
    );
    expect(screen.getByTestId("tvshow-rating")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-status")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-status").textContent).toBe(
      "Returning Series",
    );
    expect(screen.getByTestId("tvshow-seasons")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-episodes")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-genre-18")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-creators")).toBeInTheDocument();
    expect(screen.getByTestId("tvshow-networks")).toBeInTheDocument();

    // Check for cast section
    expect(screen.getByTestId("cast-section")).toBeInTheDocument();
    expect(
      screen.getByTestId("cast-section-title"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cast-name-1")).toBeInTheDocument();
    expect(screen.getByTestId("cast-name-1").textContent).toBe(
      "Actor 1",
    );
    expect(
      screen.getByTestId("cast-character-1"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cast-character-1").textContent).toBe(
      "Character 1",
    );

    // Check for crew section
    expect(screen.getByTestId("crew-section")).toBeInTheDocument();
    expect(
      screen.getByTestId("crew-section-title"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("crew-department-Directing"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("crew-department-title-Directing"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("crew-name-Directing-1"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("crew-job-Directing-1"),
    ).toBeInTheDocument();

    // Check for similar TV shows section
    expect(
      screen.getByTestId("similar-tvshows-section"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("similar-tvshows-title"),
    ).toBeInTheDocument();
  });

  it("handles loading states for different data sections", () => {
    const mockedHooks = getMockedTVShowHooks();

    // TV show details loaded but credits and similar TV shows still loading
    mockedHooks.useTVShowDetails.mockReturnValue({
      data: mockTVShowDetailsData,
      isLoading: false,
      isError: false,
    });

    // Credits still loading
    mockedHooks.useTVShowCredits.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    // Similar TV shows still loading
    mockedHooks.useSimilarTVShows.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<TVShowDetailScreen tvShowId={tvShowId} />);

    // Main content should be loaded
    expect(screen.getByTestId("tvshow-title")).toBeInTheDocument();

    // Should show loading spinners for credits and similar TV shows
    expect(screen.getByTestId("credits-loading")).toBeInTheDocument();
    expect(screen.getByTestId("similar-loading")).toBeInTheDocument();
  });

  it("properly handles empty cast and crew", () => {
    const mockedHooks = getMockedTVShowHooks();

    // Set up TV show details
    mockedHooks.useTVShowDetails.mockReturnValue({
      data: mockTVShowDetailsData,
      isLoading: false,
      isError: false,
    });

    // Empty cast and crew
    mockedHooks.useTVShowCredits.mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
      isLoading: false,
    });

    // No similar TV shows
    mockedHooks.useSimilarTVShows.mockReturnValue({
      data: {
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      },
      isLoading: false,
    });

    render(<TVShowDetailScreen tvShowId={tvShowId} />);

    // TV show details should still show
    expect(screen.getByTestId("tvshow-title")).toBeInTheDocument();

    // Cast and crew sections should not be rendered
    expect(
      screen.queryByTestId("cast-section"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("crew-section"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("similar-tvshows-section"),
    ).not.toBeInTheDocument();
  });
});
