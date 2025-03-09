import "@/src/utils/test/mockMovieHooks";
import { render, screen } from "@/src/utils/test-utils";
import MovieDetailScreen from "../MovieDetailScreen";
import {
  setupMocksLoading,
  clearAllMocks,
} from "@/src/utils/test/mockMovieHooks";
import { getMockedMovieHooks } from "@/src/utils/test/mockMovieHooks";
import {
  mockMovieDetailsData,
  mockMovieCreditsData,
  mockSimilarMoviesData,
  mockMovieError,
} from "@/src/utils/test/mockMovieDetailData";

describe("MovieDetailScreen", () => {
  const movieId = 1;

  beforeEach(() => {
    clearAllMocks();
  });

  it("renders loading state correctly", () => {
    setupMocksLoading();

    render(<MovieDetailScreen movieId={movieId} />);

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    const mockedHooks = getMockedMovieHooks();

    mockedHooks.useMovieDetails.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockMovieError,
    });

    render(<MovieDetailScreen movieId={movieId} />);

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("error-title")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByTestId("error-message").textContent).toBe(
      "Failed to load movie",
    );
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
  });

  it("renders movie not found state correctly", () => {
    const mockedHooks = getMockedMovieHooks();

    mockedHooks.useMovieDetails.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<MovieDetailScreen movieId={movieId} />);

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

  it("renders all components with movie data", () => {
    const mockedHooks = getMockedMovieHooks();

    mockedHooks.useMovieDetails.mockReturnValue({
      data: mockMovieDetailsData,
      isLoading: false,
      isError: false,
    });

    mockedHooks.useMovieCredits.mockReturnValue({
      data: mockMovieCreditsData,
      isLoading: false,
    });

    mockedHooks.useSimilarMovies.mockReturnValue({
      data: mockSimilarMoviesData,
      isLoading: false,
    });

    render(<MovieDetailScreen movieId={movieId} />);

    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();

    // Check for movie details
    expect(screen.getByTestId("movie-title")).toBeInTheDocument();
    expect(screen.getByTestId("movie-title").textContent).toContain(
      "Test Movie",
    );
    expect(screen.getByTestId("movie-tagline")).toBeInTheDocument();
    expect(screen.getByTestId("movie-tagline").textContent).toBe(
      "Test tagline",
    );
    expect(screen.getByTestId("movie-overview")).toBeInTheDocument();
    expect(screen.getByTestId("movie-overview").textContent).toBe(
      "Test overview",
    );
    expect(screen.getByTestId("movie-runtime")).toBeInTheDocument();
    expect(screen.getByTestId("movie-runtime").textContent).toBe(
      "2h 0m",
    );
    expect(screen.getByTestId("movie-score")).toBeInTheDocument();
    expect(screen.getByTestId("movie-score").textContent).toBe("85%");

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
    expect(screen.getByTestId("crew-name-1")).toBeInTheDocument();
    expect(screen.getByTestId("crew-job-1")).toBeInTheDocument();

    // Check for similar movies section
    expect(
      screen.getByTestId("similar-movies-section"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("similar-movies-title"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("similar-movie-2")).toBeInTheDocument();
    expect(
      screen.getByTestId("similar-movie-title-2"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("similar-movie-title-2").textContent,
    ).toBe("Similar Movie 1");
  });

  it("handles loading states for different data sections", () => {
    const mockedHooks = getMockedMovieHooks();

    // Movie details loaded but credits and similar movies still loading
    mockedHooks.useMovieDetails.mockReturnValue({
      data: mockMovieDetailsData,
      isLoading: false,
      isError: false,
    });

    // Credits still loading
    mockedHooks.useMovieCredits.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    // Similar movies still loading
    mockedHooks.useSimilarMovies.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<MovieDetailScreen movieId={movieId} />);

    // Main content should be loaded
    expect(screen.getByTestId("movie-title")).toBeInTheDocument();

    // Should show loading spinners for credits and similar movies
    expect(screen.getByTestId("credits-loading")).toBeInTheDocument();
    expect(screen.getByTestId("similar-loading")).toBeInTheDocument();
  });

  it("properly handles empty cast and crew", () => {
    const mockedHooks = getMockedMovieHooks();

    // Set up movie details
    mockedHooks.useMovieDetails.mockReturnValue({
      data: mockMovieDetailsData,
      isLoading: false,
      isError: false,
    });

    // Empty cast and crew
    mockedHooks.useMovieCredits.mockReturnValue({
      data: {
        id: 1,
        cast: [],
        crew: [],
      },
      isLoading: false,
    });

    // No similar movies
    mockedHooks.useSimilarMovies.mockReturnValue({
      data: {
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      },
      isLoading: false,
    });

    render(<MovieDetailScreen movieId={movieId} />);

    // Movie details should still show
    expect(screen.getByTestId("movie-title")).toBeInTheDocument();

    // Cast and crew sections should not be rendered
    expect(
      screen.queryByTestId("cast-section"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("crew-section"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("similar-movies-section"),
    ).not.toBeInTheDocument();
  });
});
