import "@/src/utils/test/mockMovieHooks";

import { render, screen } from "@/src/utils/test-utils";
import HomeScreen from "../HomeScreen";
import {
  setupMocksWithData,
  setupMocksLoading,
  setupMocksPartialData,
  clearAllMocks,
} from "@/src/utils/test/mockMovieHooks";

describe("HomeScreen", () => {
  beforeEach(() => {
    setupMocksWithData();
    clearAllMocks();
  });

  it("renders all components with movie data", () => {
    render(<HomeScreen />);

    // Check header elements
    expect(
      screen.getByTestId("header-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("header-logo")).toBeInTheDocument();
    expect(
      screen.getByTestId("header-nav-desktop"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("header-nav-home")).toBeInTheDocument();
    expect(
      screen.getByTestId("header-nav-trending"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("header-nav-discover"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("header-nav-tv")).toBeInTheDocument();
    expect(
      screen.getByTestId("header-search-form"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("header-search-input"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("header-search-button"),
    ).toBeInTheDocument();

    // Check if hero carousel is rendered with movies
    expect(screen.getByTestId("hero-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("hero-count").textContent).toBe("2");
    expect(screen.getByTestId("hero-loading").textContent).toBe(
      "Loaded",
    );
    expect(screen.getByTestId("hero-movie-1")).toBeInTheDocument();
    expect(screen.getByTestId("hero-movie-2")).toBeInTheDocument();
    expect(
      screen.getByTestId("hero-movie-title-1"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("hero-movie-overview-1"),
    ).toBeInTheDocument();

    // Check if movie rows are rendered
    expect(
      screen.getByTestId("row-title-upcoming-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-popular-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-top-rated-movies"),
    ).toBeInTheDocument();

    // Check view all links
    expect(
      screen.getByTestId("row-view-all-upcoming-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-view-all-popular-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-view-all-top-rated-movies"),
    ).toBeInTheDocument();

    // Check movie cards in each row
    const movieCards = screen.getAllByTestId("movie-card-1");
    expect(movieCards.length).toBeGreaterThanOrEqual(1); // At least one movie card with id 1

    const movieTitles = screen.getAllByTestId("movie-title-1");
    expect(movieTitles.length).toBeGreaterThanOrEqual(1);

    const movieRatings = screen.getAllByTestId("movie-rating-1");
    expect(movieRatings.length).toBeGreaterThanOrEqual(1);

    // Check footer elements
    expect(
      screen.getByTestId("footer-container"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("footer-logo")).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-social-links"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-github-link"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-linkedin-link"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-repo-link"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("footer-copyright"),
    ).toBeInTheDocument();
  });

  it("handles loading state correctly", () => {
    setupMocksLoading();

    render(<HomeScreen />);

    expect(screen.getByTestId("hero-loading").textContent).toBe(
      "Loading",
    );

    expect(screen.getByTestId("hero-carousel")).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-upcoming-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-popular-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-top-rated-movies"),
    ).toBeInTheDocument();
  });

  it("handles partial data correctly", () => {
    setupMocksPartialData();

    render(<HomeScreen />);

    expect(screen.getByTestId("hero-loading").textContent).toBe(
      "Loaded",
    );
    expect(screen.getByTestId("hero-count").textContent).toBe("2");
    expect(screen.getByTestId("hero-movie-1")).toBeInTheDocument();
    expect(screen.getByTestId("hero-movie-2")).toBeInTheDocument();

    expect(
      screen.getByTestId("row-title-upcoming-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-popular-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-title-top-rated-movies"),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("row-view-all-upcoming-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-view-all-popular-movies"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("row-view-all-top-rated-movies"),
    ).toBeInTheDocument();
  });
});
